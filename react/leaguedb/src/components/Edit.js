import React, {Component} from 'react';
import {
  Container,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

class Edit extends Component {
  constructor() {
    super();
    this.state = {
      model: "champion",
      key: ""
    }

    this.changeKey = this.changeKey.bind(this);
    this.changeModel = this.changeModel.bind(this);
    this.changeAttrs = this.changeAttrs.bind(this);
  }

  changeKey(event) {
    this.setState({
      key: event.target.value
    });
  }

  changeModel(event) {
    var new_model = event.target.value;
    var old_key = this.state.key;
    // clear form
    document.getElementById("form").reset();
    // Reset state
    this.state = { model: "", key: "" };
    this.setState({
      model: new_model,
      key: old_key
    });
  }

  changeAttrs(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  submitEdit() {
    console.log(this.state);
    var data = new FormData();
    data.append("json", JSON.stringify(this.state));
    // var url = 'https://leaguedb.com/edit';
    var url = 'http://localhost:5000/edit';
    fetch(url, {
      method: 'POST',
      body: data
    })
  }

  properCaps(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  textEntry(name) {
    return ( 
      <FormGroup row>
        <Label sm={{size: 2, offset: 2}}>{this.properCaps(name)}</Label>
        <Col sm={8}>
          <Input name={name} onChange={this.changeAttrs}/>
        </Col>
      </FormGroup>
    );
  }

  renderOptions() {
    var result = [];
    result.push(this.textEntry("name"));
    result.push(this.textEntry("icon"));
    switch (this.state.model) {
      case "champion":
        result.push(this.textEntry("classes"));
        result.push(this.textEntry("items"));
        result.push(this.textEntry("lore"));
        result.push(this.textEntry("roles"));
        break;
      case "item":
        result.push(this.textEntry("categories"));
        result.push(this.textEntry("classes"));
        result.push(this.textEntry("roles"));
        break;
      case "class":
        result.push(this.textEntry("champions"));
        result.push(this.textEntry("description"));
        result.push(this.textEntry("items"));
        break;
      case "role":
        result.push(this.textEntry("champions"));
        result.push(this.textEntry("classes"));
        result.push(this.textEntry("items"));
        break;
    }
    return result;
  }

  render() {
    return (
      <Container>
        <Form id="form">
          <FormGroup row>
            <Label sm={2}>Key</Label>
            <Col sm={10}>
              <Input type="password" value={this.state.key} onChange={this.changeKey} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>Model</Label>
            <Col sm={10}>
              <Input type="select" value={this.state.model} onChange={this.changeModel}>
                <option value="champion"> Champion </option>
                <option value="item"> Item </option>
                <option value="class"> Class </option>
                <option value="role"> Role </option>
              </Input>
            </Col>
          </FormGroup>
          {this.renderOptions()}
          <FormGroup check row>
            <Col sm={{ size: 2, offset: 10 }}>
              <Button onClick={() => this.submitEdit()}>Submit</Button>
            </Col>
          </FormGroup>
        </Form>
      </Container>
    )
  }
}

export default Edit;
