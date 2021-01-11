import {  Row, Col } from 'reactstrap';
import Container from '@material-ui/core/Container';
import styles from "../styles.module.css";
import iso from "../images/iso.png";
import Button from '@material-ui/core/Button';
import React, {Component} from "react";
import css from "./upload.module.css";

class UploadImage extends Component {

    constructor(props){
        super(props)
        this.state = {
          file: null,
          images : []
        }
        this.handleChange = this.handleChange.bind(this)
      }

      handleChange(event) {
        this.setState({
          images: (event.target.files)
         
        }
        , 
        () => {
            console.log(this.state.images)
            var formdata = new FormData();
            formdata.append("file", this.state.images[0], this.state.images[0].name);
            formdata.append("algorithm", "yolo");

            var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
            };

            fetch("http://localhost:8080/inference/test", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
                        

        }
        )
        
      }

        
     
    render(){

        
        return(
            <Container >
                <Row className={css.updloadimage}>
                    <Col className={css.uploadleftdiv} lg="6">
                        <Row >
                            <h2  className={css.alignleft}>Upload Images</h2>
                        </Row>
                        <Row className={css.rowheight}>
                            <div className={css.uploadimagecontainer}>
                                <h2>Drag and Drop files here</h2>
                                <br></br>
                                <h3>OR</h3>
                                    <Button style={{
                                            borderRadius: 10,
                                            backgroundColor: "#1C73FC",
                                            padding: "18px 36px",
                                            fontSize: "18px",
                                            color : "#FFFFFF",
                                            
                                            
                                        }}
                                      
                                        variant="contained"
                                        component="label"
                                        >
                                        Upload your files
                                        <input id="images"
                                            onChange={this.handleChange}
                                            type="file"
                                            hidden
                                            multiple
                                        />
                                    </Button>
                                    
                            </div>
                        </Row>
                              
                    </Col>
                    <Col className={css.uploadrightdiv} lg="6" >
                        <img src={iso} alt="Iso" />
                    </Col>
                </Row>
            </Container>
        )

    }
}

export default UploadImage ; 