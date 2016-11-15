var styles = {
  transparentBg: {
    background: 'transparent'
  },
  space: {
    marginTop: '25px'
  },
  landscapeImage: {
    maxWidth: "95%",
    height: "auto",
    //maxHeight: '85%'
  },
  portraitImage: {
    maxHeight: '90%',
    // width: "auto",  
    maxWidth: '100%',
    paddingRight: "5px"
  },
  container: {
    overflow: "hidden",
  },
  sidebar: {
    float: "left",
    width: "60%",
  },
  content: {
      display: "block",
      overflow: "hidden",
      padding: "5%"
  },
  fieldBlock: {
    float: "left",
    padding: "10px"
  },
thumbnail: {
    position: "relative",
    width: "200px",
    height: "200px",
    overflow: "hidden"
  },
  thumbnail_img: {
    position: "absolute",
    left: "50%",
    top: "50%",
    height: "100%",
    width: "auto",
    WebkitTransform: "translate(-50%,-50%)",
    MsTransform: "translate(-50%,-50%)",
    transform: "translate(-50%,-50%)"
  },
  thumbnail_img_portrait: {
    width: "100%",
    height: "auto"
  }
};

module.exports = styles;