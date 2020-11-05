import { Box, Button, IconButton, InputBase, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Field, reduxForm } from "redux-form";
import styles from "./styles";
import PropTypes from "prop-types";

PostUpload.propTypes = {
  onSubmitUpload: PropTypes.func,
};

const renderTextField = ({
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <InputBase
    fullWidth
    placeholder="Bạn đang nghĩ gì? 👀"
    {...input}
    {...custom}
  />
);

function PostUpload(props) {
  const { classes, handleSubmit, reset, onSubmitUpload } = props;
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    multiple: false,
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
      setFiles(
        acceptedFiles.map((file) => ({
          file: file,
          preview: URL.createObjectURL(file),
        }))
      );
    },
  });

  const handleClearFiles = (e) => {
    e.stopPropagation();
    setFiles([]);
  };

  const thumbs = files.map((file) => (
    <div className={classes.thumb} key={file.name}>
      <div className={classes.thumbInner}>
        <img alt="" src={file.preview} className={classes.img} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      // files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const handleSubmitPost = (data) => {
    if (!onSubmitUpload) return;

    const { content } = data;
    onSubmitUpload({ content, files });
    setFiles([]);
    reset();
  };

  return (
    <Box>
      <Paper variant="outlined" square>
        <Box padding={2}>
          <form onSubmit={handleSubmit(handleSubmitPost)}>
            <Field name="content" component={renderTextField} />
            <div {...getRootProps()} className={classes.dropzone}>
              <IconButton onClick={handleClearFiles} size="small">
                <Close size="small" />
              </IconButton>
              <input {...getInputProps()} />
              {thumbs.length > 0 ? (
                <div className={classes.thumbContainer}>{thumbs}</div>
              ) : (
                <p>Kéo và thả một số tệp tại đây hoặc nhấp để chọn tệp</p>
              )}
            </div>
            <div className={classes.buttonWrapper}>
              <Button
                type="submit"
                edge="end"
                variant="contained"
                color="primary"
              >
                Đăng
              </Button>
            </div>
          </form>
        </Box>
      </Paper>
    </Box>
  );
}

const withReduxForm = reduxForm({
  form: "POST",
  enableReinitialize: true,
});

export default withReduxForm(withStyles(styles)(PostUpload));
