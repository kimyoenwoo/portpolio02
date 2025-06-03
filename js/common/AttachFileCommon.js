/*
 * AttachFileClass.js
 * 첨부파일 모듈
 * auther : lgh
 * createDate : 2020-05-21 
 */

var ATTACH_FILE_OBJ_ARRAY = [];

var ATTACH_FILE_OBJ_CNT = 0;

var AttachFileCommon = jQuery.Class.create({
	
	initialize:function(win){
		this.fileCountLimit = 4; /* 첨부가능 허용 수 */
		this.fileCount = 0; /* 현재까지 첨부된 파일 수 */
		this.fileSizeLimit = 104857600; /* 첨부가능 허용 용량 */
		this.fileSize = 0; /* 현재까지 첨부된 파일 용량 */

		this.attachFileKind = []; /* 첨부가능 확장자 목록 / 기본 모든 확장자 허용 */
		
		this.filePath = "rahan2002";
		this.width = "100%";
		this.height = "50px";
		
		this.newId = "";
		
		this.uploadCallBackFunction = null;
		this.deleteCallBackFunction = null;
	},
	
	makeAttachFileArea:function( areaId, filePath, attachDocNo, menuNo, width, height ){
		if( ! gfn_isNull( filePath ) ){
			this.filePath = filePath;
		}

		if( ! gfn_isNull( width ) ){
			this.width = width;
		}
		
		if( ! gfn_isNull( height ) ){
			this.height = height;
		}
		
		var newId = ATTACH_FILE_OBJ_CNT++;
		
		this.newId = newId;
		
		ATTACH_FILE_OBJ_ARRAY[ newId ] = this;
		
		var html = "";
		html += '<div style="width:' + this.width + ';">';
		if( attachDocNo != null ){
			html += '<input type="hidden" id="form_attachDocNo_' + this.newId + '" value="' + attachDocNo + '">';
		} else {
			html += '<input type="hidden" id="form_attachDocNo_' + this.newId + '" value="">';
		}
		html += '<table style="width:' + this.width + ';border:1px solid #000;">';
		html += '<colgroup><col width="*"><col width="60px"></colgroup>';
		html += '<thead>';
		html += '<tr>';
		html += '<th>파일명</th>';
		html += '<th>&nbsp;</th>';
		html += '</tr>';
		html += '</thead>';
		html += '</table>';
		html += '<div style="width:99.7%;height:' + this.height + ';overflow:auto;border:1px solid #000;">';
		html += '<table style="width:100%;border:1px solid #000;">';
		html += '<colgroup><col width="*"><col width="60px"></colgroup>';
		html += '<tbody id="attachFileListArea_' + this.newId + '">';
		html += '</tbody>';
		html += '</table>';
		html += '</div>';
		html += '<form id="attachFileInputForm_' + this.newId + '" name="attachFileInputForm" method="post" action="/common/attachFileUpload.do" target="attachFileUploadIframe" enctype="multipart/form-data">';
		if( attachDocNo != null ){
			html += '<input type="hidden" name="attachDocNo" value="' + attachDocNo + '">';
		} else {
			html += '<input type="hidden" name="attachDocNo" value="0">';
		}
		html += '<input type="hidden" name="menuNo" value="' + menuNo + '">';
		html += '<input type="hidden" name="attachFilePath" value="' + this.filePath + '">';
		html += '<input type="hidden" name="fileObjId" value="' + this.newId + '">';
		html += '<div id="attachFileInputFormArea_' + this.newId + '" style="overflow:hidden;width:60px;height:20px;background-image:url(\'/images/fileUp/btn_file_upload.png\');text-align:center;">';
		html += '<input type="file" name="attachFileInput" style="width:60px;height:20px;margin:0px;filter:alpha(opacity=0);opacity:0;cursor:pointer;" onchange="fcf_doFileAttach(this,\'' + this.newId + '\');">';
		html += '</div>';
		html += '</form>';
		html += '<div style="display:none;"><iframe id="attachFileUploadIframe_' + this.newId + '" name="attachFileUploadIframe" src=""></iframe></div>';
		html += '</div>';
		
		$("#"+areaId).html( '' );

		$("#"+areaId).html( html );
		
		html = null;
		
		if( attachDocNo != null ){
			var searchData = {};
			searchData['attachDocNo'] = attachDocNo;
			searchData['newId'] = this.newId;
		   
			$.ajax({
				type: 'POST',
				dataType : 'json',
				async:false,
				scriptCharset: 'utf-8',
				url : "/common/selectAttachDtlInfoList.do",
				data: searchData,
				success: function(data){
					var attachDtlInfoList = data.attachDtlInfoList;
					var newId = data.newId;
					
					var fileList = "";

					for( var i=0 ; i<attachDtlInfoList.length ; i++ ){
						fileList  = '<tr id="attachFileRow_' + newId + '_' + attachDtlInfoList[i].seq + '">';
						fileList += '<td style="max-width:120px;">';
						fileList += '<a href="/common/downloadAttachFile.do?attachDocNo=' + attachDocNo + '&seq=' + attachDtlInfoList[i].seq + '">' + attachDtlInfoList[i].attFileNm + '</a>';
						fileList += '</td>';
						fileList += '<td><input type="button" style="overflow:hidden;width:60px;height:20px;background-image:url(\'/images/fileUp/btn_file_delete.png\');" onClick="fcf_doFileDelete(\'' + newId + '\',\'' + attachDtlInfoList[i].seq + '\');"></td>';
						fileList += '</tr>';
						
						$("#attachFileListArea_" + newId).append( fileList );
						
						ATTACH_FILE_OBJ_ARRAY[ newId ].fileCount++;
						ATTACH_FILE_OBJ_ARRAY[ newId ].fileSize = parseInt( ATTACH_FILE_OBJ_ARRAY[ newId ].fileSize ) + parseInt( attachDtlInfoList[i].filesize );
					}
					
					fileList = null;
				},
				error:function (err){
					call_errAjax(err);
					//dhtmlx.alert("ajaxCommonDhtmlXComboCode error"+err);
					dhtmlx.alert("첨부파일 목록 조회에 실패하였습니다.");
				}
			});
		}
	},
	
	/* 파일 첨부 최대 허용 수 설정 */
	setFileCountLimit:function(value){
		this.fileCountLimit = value;
	},
	
	/* 파일 첨부 최대 허용 용량 설정 */
	setFileSizeLimit:function(value){
		this.fileSizeLimit = value;
	},
	
	/* 파일 업로드 시 호출될 Call Back Function 지정 */
	/* 첨부문서번호, 파일명(확장자제외), 확장자 반환 */
	setUploadCallBackFunction:function(func){
		this.uploadCallBackFunction = func;
	},

	/* 파일 삭제 시 호출될 Call Back Function 지정 */
	setDeleteCallBackFunction:function(func){
		this.deleteCallBackFunction = func;
	},
	
	/* 첨부가능 확장자 목록 추가 */
	addAttachFileKind:function(value){
		this.attachFileKind.push( value.toLowerCase() );
	},
	
	/* attachDocNo return */
	getAttachDocNo:function(){
		var attachDocNoInput = document.getElementById( 'form_attachDocNo_' + this.newId );
		return attachDocNoInput.value;
	},
	
	byteCalculation:function( bytes ){
		var bytes = parseInt(bytes);
		var s = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
		var e = Math.floor(Math.log(bytes)/Math.log(1024));
	   
		if(e == "-Infinity") return "0 "+s[0]; 
		else 
		return (bytes/Math.pow(1024, Math.floor(e))).toFixed(2)+" "+s[e];
	},
	
	/* 파일 UPLOAD */
	uploadFile:function( obj, fileObjId ){
		if( this.attachFileKind.length > 0 ){
			var checkExt = false;
			var fileExt = obj.value;
			fileExt = fileExt.slice( fileExt.indexOf(".") + 1 ).toLowerCase();
			
			for( var i = 0; i<this.attachFileKind.length ; i++ ){
				if( fileExt == this.attachFileKind[i] ){
					checkExt = true;
					break;
				}
			}
			
			if( ! checkExt ){
				dhtmlx.alert("허용된 첨부파일은 '" + this.attachFileKind + "' 입니다.");
				return;
			}
		}

		if( this.fileCount == this.fileCountLimit ){
			dhtmlx.alert("첨부파일의 최대 수는 " + this.fileCountLimit-1 + " 개 입니다.");
			return;
		}

		var fileInputForm = document.getElementById( "attachFileInputForm_" + fileObjId );
		
		var fileSize = 0;
		if( obj.files && obj.files[0] ){
			fileSize = obj.files[0].size;
		} else {
			/*
			 * IE 9 이하
			 * 사용하기 위해서는 인터넷 옵션 > 보안 > 사용자 지정 수준 에서
			 * 스크립팅하기 안전하지 않은 것으로 표시된 ActiveX컨트롤 초기화 및 스크립팅을 사용하도록 설정해야 한다.
			 */
			fileInputForm.attachFileInput.select();
			var myFSO = new ActiveXObject("Scripting.FileSystemObject");
	        var filepath = document.selection.createRangeCollection()[0].text;
		    var thefile = myFSO.getFile(filepath);
		    fileSize = thefile.size;
		}
		
		if( this.fileSizeLimit < parseInt( this.fileSize ) + parseInt( fileSize ) ){
			dhtmlx.alert("첨부파일의 최대 용량은 " + byteCalculation( this.fileSizeLimit ) + "byte 입니다.");
			return;
		}

		this.fileCount++;
		this.fileSize = parseInt( this.fileSize ) + parseInt( fileSize );

		fileInputForm.submit();
	},
	
	/* 파일 정보 생성 */
	addFileInfo:function( attachDocNo, seq, fileName, filesize ){
		if( fileName != null && fileName != "" ){
			$("#form_attachDocNo_" + this.newId).val( attachDocNo );
			$("#attachFileInputForm_" + this.newId + " [name=attachDocNo]").val( attachDocNo );
			
			var fileList = "";
			fileList += '<tr id="attachFileRow_' + this.newId + '_' + seq + '">';
			fileList += '<td style="max-width:120px;">';
			fileList += '<a href="/common/downloadAttachFile.do?attachDocNo=' + attachDocNo + '&seq=' + seq + '">' + fileName + '</a>';
			fileList += '</td>';
			fileList += '<td><input type="button" style="overflow:hidden;width:60px;height:20px;background-image:url(\'/images/fileUp/btn_file_delete.png\');" onClick="fcf_doFileDelete(\'' + this.newId + '\',\'' + seq + '\');"></td>';
			fileList += '</tr>';
			
			$("#attachFileListArea_" + this.newId).append( fileList );

			
			this.fileCount++;
			this.fileSize = parseInt( this.fileSize ) + parseInt( filesize );
			
			fileList = null;
			
			if( typeof this.uploadCallBackFunction == 'function' ){
				var fileNameExExt = fileName.substring( 0, fileName.indexOf(".") );
				var fileExt = fileName.slice( fileName.indexOf(".") + 1 ).toLowerCase();
				
				this.uploadCallBackFunction( attachDocNo, fileNameExExt, fileExt );
			}
		} else {
			dhtmlx.alert("첨부파일 등록에 실패하였습니다.");
		}
	},
	
	/* 파일 삭제 */
	deleteFile:function( fileObjId, seq ){
		if(confirm("첨부파일을 삭제하시겠습니까?<br>삭제하면 복구 할 수 없습니다.")){
					var deleteData = {};
					deleteData['attachDocNo'] = $("#form_attachDocNo_" + fileObjId).val();
					deleteData['seq'] = seq;
					deleteData['newId'] = fileObjId;
		
					$.ajax({
						type: 'POST',
						dataType : 'json',
						async:false,
						scriptCharset: 'utf-8',
						url : "/common/deleteAttachDtlInfo.do",
						data: deleteData,
						success: function(data){
							if( data.result == '1' ){
								$("#attachFileRow_" + fileObjId + "_"+seq).remove();
								dhtmlx.alert("첨부파일을 삭제하였습니다.");
								
								ATTACH_FILE_OBJ_ARRAY[ fileObjId ].fileCount--;
								ATTACH_FILE_OBJ_ARRAY[ fileObjId ].fileSize = parseInt( ATTACH_FILE_OBJ_ARRAY[ fileObjId ].fileSize ) - parseInt( data.deleteFileSize );

								if( typeof ATTACH_FILE_OBJ_ARRAY[ fileObjId ].deleteCallBackFunction == 'function' ){
									ATTACH_FILE_OBJ_ARRAY[ fileObjId ].deleteCallBackFunction( ATTACH_FILE_OBJ_ARRAY[ fileObjId ].fileCount );
								}
								
								if( data.attachDtlInfoSize == 0 ){
									$("#form_attachDocNo_" + fileObjId).val( '' );
									$("#attachFileInputForm_" + fileObjId + " [name=attachDocNo]").val( '0' );
								}
							} else {
								dhtmlx.alert("첨부파일 삭제에 실패하였습니다.");
							}
						},
						error:function (err){
							call_errAjax(err);
							//dhtmlx.alert("ajaxCommonDhtmlXComboCode error"+err);
							dhtmlx.alert("첨부파일 삭제에 실패하였습니다.");
						}
					});
				}
			}
			
		});

function fcf_doFileAttach( fileObj, fileObjId ){
	ATTACH_FILE_OBJ_ARRAY[ fileObjId ].uploadFile( fileObj, fileObjId );
}

function fcf_doFileDelete( fileObjId, fileSeq ){
	ATTACH_FILE_OBJ_ARRAY[ fileObjId ].deleteFile( fileObjId, fileSeq );
}