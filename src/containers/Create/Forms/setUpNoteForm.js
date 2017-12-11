import React from 'react'
import { Input } from 'antd'

class SetUpNoteForm extends React.Component {

  onFieldChange(event) {
    // for a regular input field, read field name and value from the event
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    this.props.onChange(fieldName, fieldValue);
  }

  render() {
    return (
      <Input 
        placeholder='Notes' 
        type="textarea" 
        rows={10} 
        autosize={{ minRows: 3, maxRows: 5 }}
        style={{ marginBottom: '15px' }}
        name="customerNoteContent"
        // onChange={this.onFieldChange.bind(this)}
      />
    );
  }
}

export default SetUpNoteForm



