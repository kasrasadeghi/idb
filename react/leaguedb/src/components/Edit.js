import React, {Component} from 'react';
import {
  Container,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';

class Edit extends Component {
  constructor() {
    super();
    this.state = {
      model: "champion"
    }

    this.changeModel = this.changeModel.bind(this);
  }

  changeModel(event) {
    this.setState({
      model: event.target.value
    });
  }

  printState() {
    console.log(this.state);
  }

  render() {
    return (
      <Container>
        <Form>
          <FormGroup row>
            <Label for="editPass" sm={2}>Password</Label>
            <Col sm={10}>
              <Input type="password" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="modelSelect" sm={2}>Model</Label>
            <Col sm={10}>
              <Input type="select" name="select" value={this.state.model} onChange={this.changeModel}>
                <option value="champion"> Champion </option>
                <option value="item"> Item </option>
                <option value="class"> Class </option>
                <option value="role"> Role </option>
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="reasonText" sm={2}>Reason</Label>
            <Col sm={10}>
              <Input type="textarea" name="text" id="reasonText" />
            </Col>
          </FormGroup>
          <FormGroup check row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button onClick={() => this.printState()}>Submit</Button>
            </Col>
          </FormGroup>
        </Form>
      </Container>
    )
  }
}

export default Edit;
