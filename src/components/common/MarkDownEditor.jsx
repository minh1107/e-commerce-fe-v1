import React, { memo, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

function MarkDownEditor({label, changeValue, name , invalidField, setInvalidField ,initialValue}) {
    
  return (
    <>
      <span>{label}</span>
      <Editor
        apiKey={process.env.REACT_APP_MCETINY}
        // "<p>This is the initial content of the editor.</p>"
        initialValue={initialValue}
        init={{
          height: 200,
          menubar: true,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar: 'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        onChange={e => changeValue(prev => ({...prev, [name]: e.target.getContent()}))}
        onFocus={() => invalidField && setInvalidField([])}
      />
    </>
  );
}

export default memo(MarkDownEditor)