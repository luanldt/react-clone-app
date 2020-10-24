import { Divider, Icon, IconButton, InputBase, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import styles from './styles';

class FormQuickAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };
  }

  componentDidMount() {
    const { initialData } = this.props;
    if (initialData) {
      this.setState({
        name: initialData,
      });
    }
  }

  _handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleSubmitForm = (e) => {
    const { onSubmitForm } = this.props;
    const { name } = this.state;

    if (!name || name === '') {
      return;
    }

    if (onSubmitForm) {
      onSubmitForm({ name });
    }

    this.setState({
      name: '',
    });
  };

  render() {
    const { classes, placeholder, isShowAddButton } = this.props;
    const { name } = this.state;
    return (
      <Paper
        component="form"
        onSubmit={this.handleSubmitForm}
        className={classes.root}
      >
        <InputBase
          className={classes.input}
          size="small"
          placeholder={placeholder}
          value={name}
          rowsMin={1}
          multiline
          name="name"
          onBlur={this.handleSubmitForm}
          onChange={this._handleChange}
        />
        {isShowAddButton && (
          <Fragment>
            <Divider flexItem orientation="vertical" />
            <IconButton onClick={this.handleSubmitForm} size="small">
              <Icon size="small">add_circle</Icon>
            </IconButton>
          </Fragment>
        )}
      </Paper>
    );
  }
}

FormQuickAdd.propTypes = {
  classes: PropTypes.object,
  onSubmitForm: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  initialData: PropTypes.string,
  isShowAddButton: PropTypes.bool,
};

export default withStyles(styles)(FormQuickAdd);
