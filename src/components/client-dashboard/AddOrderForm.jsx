// @flow
import React from 'react';
import {reduxForm, Field} from 'redux-form';
import { themr } from 'react-css-themr';

import {Tab, Tabs} from 'react-toolbox';
import Dropdown from 'react-toolbox/lib/dropdown';
import Input from 'react-toolbox/lib/input';
import InputTheme from 'react-toolbox/lib/input/theme.css';
import {BrowseButton} from 'react-toolbox/lib/button';

import us from 'us';

const SETTINGS = window.SETTINGS;

const STATES = [{label: '-', value: null}, ...us.STATES.map(state => ({
  label: state.name,
  value: state.abbr
}))];

const ToolboxDropdown = ({ input, meta, ...props }) => (
  <Dropdown
    {...input}
    {...props}
    error={meta.touched && meta.error} />
);

const ToolboxInput = ({ input, meta, ...props }) => (
  <Input
    {...input}
    {...props}
    error={meta.touched && meta.error} />
);

const FileSelectButton = themr('RTInput', InputTheme, { withRef: true })(class FileSelectButton extends React.Component {
  props: any;

  handleInputChange (e) {
    const { input } = this.props;
    const files = [ ...e.target.files ];
    if (files && files.length) {
      input.onChange(files[0]);
    } else {
      input.onChange(null);
    }
  }

  render () {
    const { input, meta, theme, ...props } = this.props;
    const { error, touched } = meta;
    const { value } = input;

    const errorDisplay = error && touched && (
      <div className={theme.error}>{error}</div>
    );

    const fileName = value && value.name;

    return (
      <div>
        <BrowseButton
          icon={value ? 'done' : 'file_upload'}
          label='Upload a CSV File'
          onChange={e => this.handleInputChange(e)}
          {...props}
        />
        {fileName}
        {errorDisplay}
      </div>
    );
  }
});

const required = value => value ? undefined : 'Required';

class AddOrderFormContent extends React.Component {
  render () {
    return (
      <form>
        <div>
          {this.props.errorMessage}
        </div>
        <div>
          <Field name='name' component={ToolboxInput} type='text' label='Order Name' validate={[ required ]} />
        </div>
      </form>
    );
  }
}

const Form = reduxForm({
  form: 'AddOrderForm',
  getFormState: state => state.addOrder.form,
  onSubmit: (values, dispatch, props) => props.onCreateOrder(values)
})(AddOrderFormContent);

export default class FormWrapper extends React.Component {
  state: {
    index: number
  };
  form: any;

  state = {
    index: 0
  }

  handleTabChange = (index : number) => {
    this.setState({index});
  }

  handleSubmitFail = () => {
    this.setState({index: 0});
  }

  submit = (...args : any[]) => {
    return this.form.submit(...args);
  }

  render () {
    return <Form ref={e => { this.form = e; }} onSubmitFail={this.handleSubmitFail} {...this.props} />;
  }
}
