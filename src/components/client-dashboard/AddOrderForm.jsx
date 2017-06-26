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
        <Tabs index={this.props.tabIndex} onChange={this.props.onTabChange} fixed hideMode='display'>
          <Tab label='Order'>
            <div>
              <Field name='orderType' component={ToolboxDropdown} auto label='Order Type' validate={[ required ]} source={SETTINGS.ENABLED_ORDER_TYPES} />
            </div>
            <div>
              <Field name='customerOrderId' component={ToolboxInput} type='text' label='Order ID' validate={[ required ]} />
            </div>
            <div>
              <Field name='name' component={ToolboxInput} type='text' label='Order Name' validate={[ required ]} />
            </div>
            <div>
              <Field name='intendedUse' component={ToolboxInput} type='text' label='Intended Use' validate={[ required ]} />
            </div>
            <div>
              <Field name='clientName' component={ToolboxInput} type='text' label='Client Name' validate={[ required ]} />
            </div>
            <div>
              <Field name='specialComments' component={ToolboxInput} type='text' label='Special Instructions' />
            </div>
            <div>
              <Field name='orderFile' component={FileSelectButton} validate={[ required ]} />
            </div>
          </Tab>
          <Tab label='Client'>
            <div>
              <Field name='clientAddress' component={ToolboxInput} type='text' label='Address' />
            </div>
            <div>
              <Field name='clientCity' component={ToolboxInput} type='text' label='City' />
            </div>
            <div>
              <Field name='clientState' component={ToolboxDropdown} auto label='State' source={STATES} />
            </div>
            <div>
              <Field name='clientZipcode' component={ToolboxInput} type='text' label='Zipcode' />
            </div>
            <div>
              <Field name='clientPhone' component={ToolboxInput} type='text' label='Phone' />
            </div>
          </Tab>
          <Tab label='Lender'>
            <div>
              <Field name='lenderName' component={ToolboxInput} type='text' label='Name' />
            </div>
            <div>
              <Field name='lenderAddress' component={ToolboxInput} type='text' label='Address' />
            </div>
            <div>
              <Field name='lenderCity' component={ToolboxInput} type='text' label='City' />
            </div>
            <div>
              <Field name='lenderState' component={ToolboxDropdown} auto label='State' source={STATES} />
            </div>
            <div>
              <Field name='lenderZipcode' component={ToolboxInput} type='text' label='Zipcode' />
            </div>
            <div>
              <Field name='lenderPhone' component={ToolboxInput} type='text' label='Phone' />
            </div>
          </Tab>
        </Tabs>
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
    return <Form ref={e => { this.form = e; }} onSubmitFail={this.handleSubmitFail} onTabChange={this.handleTabChange} tabIndex={this.state.index} {...this.props} />;
  }
}
