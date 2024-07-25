// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {useEditorValues, useOnChange} from "../hooks"
import {Values, valuesDefault} from "../values"

function InputField({valueKey, title}: {valueKey: keyof Values, title?: string}) {
  const editorValues = useEditorValues()
  const onChange = useOnChange()

  return (
    <div className="form-group">
      <label className="form-label" htmlFor={valueKey}>
        {title ?? valueKey}
      </label>
      <div className="input-group">
        <input
          className="form-control"
          type="text"
          placeholder={valuesDefault[valueKey] as string}
          defaultValue={editorValues[valueKey] as string}
          onInput={e => {
            const target = e.target as HTMLInputElement
            onChange({[valueKey]: target.value})
          }}
        />
      </div>
    </div>
  )
}
function ToggleField({valueKey, title}: {valueKey: keyof Values, title?: string}) {
  const editorValues = useEditorValues()
  const onChange = useOnChange()

  return (
    <div className="form-group">
      <label className="form-label" htmlFor={valueKey}>
        {title ?? valueKey}
      </label>
      <div className="input-group">
      <input
        type="checkbox" 
        defaultChecked={editorValues[valueKey] as boolean} 
        onChange={(e) => {
          const target = e.target as HTMLInputElement
          onChange({[valueKey]: target.checked})
        }}
        />
        
      </div>
    </div>
  )
}

const Editor = () => (
  <fieldset className="form">
    <div className="form-group">
      <InputField valueKey="schemaID" title="schemaID" />
      <ToggleField valueKey="showOperations" title="showOperations" />
      <ToggleField valueKey="showErrors" title="showErrors" />
    </div>
  </fieldset>
)

export default Editor
