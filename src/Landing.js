import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';


const Landing = () => {
  // Code for pulling metadata from DICOMweb and FHIR APIs
  const [isLoading, setIsLoading] = React.useState(false);

  // Clicking the Pull Metadata button will log the API GET response to the console
  React.useEffect(() => {
    if (isLoading) {
      var apikey = prompt('Please enter your API key:', 'apikey')
      fetch('https://hackathon.siim.org/fhir/ImagingStudy/a508258761846499', {
        method: 'GET',
        headers: {
          'apikey': apikey
        }
      })
        .then(response => response.json())
        .then(response => console.log(response))
        .then(success => {
          setIsLoading(false);
        })
        .catch(e => {
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  const pullMetadata = () => {
    setIsLoading(true);
  };

  return (
    <Container className="p-3">
      <Row>
        <Col>User Account: John Doe MD</Col>
        <Col>
          <Button>Cancel</Button>
          <Button>Save</Button>
          <Button
            type='submit'
            disabled={isLoading}
            onClick={!isLoading ? pullMetadata : null}
          >
            Pull Metadata
        </Button>
        </Col>
        <Col>
          <Link to="/cases">Back to List of Cases</Link>
        </Col>
      </Row>
      <hr></hr>
      <Row>
        <Col>Patient Name</Col>
        <Col>SIIM^Andy</Col>
        <Col>Accession No:</Col>
        <Col>a508258761846499</Col>
      </Row>
      <Row>
        <Col>MRN</Col>
        <Col>TCGA-50-5072</Col>
        <Col>Modality</Col>
        <Col>CT CHEST N/C</Col>
      </Row>
      <Row>
        <Col>DOB</Col>
        <Col>06/20/1974</Col>
        <Col>Reason for Study</Col>
        <Col>Follow-up of pulmonary nodules</Col>
      </Row>
      <Row>
        <Col>Study Date</Col>
        <Col>01/28/2020</Col>
        <Col></Col>
        <Col></Col>
      </Row>

      <br></br>
      <Row>
        <Col>Orders</Col>
      </Row>
      <hr></hr>
      <Row>
        <Col>Descriptor: add hashtags, separated by a comma</Col>
        <Col><Tags /></Col>
      </Row>
      <Row><Form.Check inline label="Add to teaching file" type="checkbox" id={'inline-checkbox-teachingfile'} /></Row>
      <Row>
        <Col><FollowUp /></Col>
      </Row>
      <Row>
      <Form.Group controlId="additional-notes">
        <Form.Label>Additional Notes</Form.Label>
        <Form.Control as="textarea" placeholder="Enter additional notes here" rows="3"/>
      </Form.Group>
    </Row>
    </Container>);
}

const FollowUp = () => {
  const [showFollowUpParameters, setShowFollowUpParameters] = React.useState(false)
  const onClick = () => {showFollowUpParameters ? setShowFollowUpParameters(false) : setShowFollowUpParameters(true);}
  return (
    <div>
      <Form.Check inline type="checkbox" label="Follow-up" onClick={onClick} />
      {showFollowUpParameters ? <FollowUpParameters /> : null}
    </div>
  )
}

const SearchVisits = () => {
  const [showVisits, setShowVisits] = React.useState(false)
  const onClick = () => {showVisits ? setShowVisits(false) : setShowVisits(true);}
  return (
    <div>
      <input type="submit" value="Pending Scheduled Visit" onClick={onClick} />
      { showVisits ? <Visits /> : null }
    </div>
  )
}

const FollowUpParameters = () => (
  <div key={`inline-checkbox`} className="mb-3">
    <Row>
    <Form.Check inline label="3 Days" type="checkbox" id={`inline-checkbox-1`} />
    <Form.Check inline label="7 Days" type="checkbox" id={`inline-checkbox-2`} />
    <Form.Check inline label="14 Days" type="checkbox" id={`inline-checkbox-3`} />
    <Form.Check inline label="1 Month" type="checkbox" id={`inline-checkbox-4`} />
    <Form.Check inline label="6 Months" type="checkbox" id={`inline-checkbox-5`} />
    <Form.Check inline label="1 Year" type="checkbox" id={`inline-checkbox-6`} />
    <Form.Check inline label="Custom Date" type="checkbox" id={'inline-checkbox-7'} />
    <Form.Control inline label="Custom Date Text" type="date" id={'inline-custom-date-1'} style={{width: 200}} />
    </Row>
    <Row>
    <Col><Form.Check label="Pending Outside Imaging" type="checkbox" id={'inline-checkbox-outside-img'} /></Col>
    <Col><Form.Check label="For review at Tumor Board" type="checkbox" id={'inline-checkbox-tumor-board'} /></Col>
    <Col><SearchVisits /></Col>
    </Row>
  </div>
);


const Visits = () => (
  <div id="results" className="search-results">
    <Row>
      <Col>Visit</Col><Col>Physician</Col><Col>Location</Col><Col>link</Col>
    </Row>
    <Row>
      <Col>7/1/2020</Col><Col>Dr.Pepper</Col><Col>Amb. Surgery</Col><Col><Form.Check inline label="" type="checkbox" id={'inline-op-visit-1'} /></Col>
    </Row>
    <Row>
      <Col>8/5/2020</Col><Col>Dr.Seldinger</Col><Col>Interventional Radiology</Col><Col><Form.Check inline label="" type="checkbox" id={'inline-op-visit-2'} /></Col></Row>
    <Row>
      <Col>8/20/2020</Col><Col>Dr.Gupta</Col><Col>Outpatient</Col><Col><Form.Check inline label="" type="checkbox" id={'inline-op-visit-3'} /></Col>
    </Row>
  </div>
)


const ListItem = ({ value, onClick }) => (
  <li onClick={onClick}>{value}</li>
);

const List = ({ items, onItemClick }) => (
  <ul>
    {
      items.map((item, i) => <ListItem key={i} value={item} onClick={onItemClick} />)
    }
  </ul>
);

class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      tags: ['#neuro', '#glioma', '#rare']
    };
  }

  onClick = () => {
    const { inputValue, tags } = this.state;
    if (inputValue) {
      const nextState = [...tags, inputValue];
      this.setState({ tags: nextState, inputValue: '' });
    }
  }

  onChange = (e) => this.setState({ inputValue: e.target.value });

  handleItemClick = (e) => {
    //console.log(e.target.innerHTML);
    // do nothing
    //this.tags.forEach(item,key) =>{console.log("nothing");}
  }

  render() {
    const { tags, inputValue } = this.state;
    return (
      <div>
        <input type="text" value={inputValue} onChange={this.onChange} />
        <button onClick={this.onClick}>Add</button>
        <List items={tags} onItemClick={this.handleItemClick} />
      </div>
    );
  }
}



export default Landing;
