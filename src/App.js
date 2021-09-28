import React, { Component } from 'react'
import { Button, Form, Container, Header } from 'semantic-ui-react'
import './App.css';
import axios from 'axios';

export default class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       results: [],
       sortType: 'DRUG'
    }
  }

  submitHandler = e => {
    e.preventDefault();
  
    axios('https://sheet.best/api/sheets/b3964dec-ab80-4600-b7c1-5a8bd89b39cd')
    .then(response => {
      let sortedResults = response.data.sort((a, b) => {
        if(a['DRUG'] < b['DRUG']) { return -1; }
        if(a['DRUG'] > b['DRUG']) { return 1; }
        return 0;
      });

      this.setState({
        results: sortedResults,
        sortType: 'DRUG'
      });
    })
  }

  sortHandler = (type) => {
    if (type == 'DRUG' && this.state.sortType == 'DRUG') {
      type = 'BRAND NAME'
    }
    let sortedResults = [...this.state.results].sort((a, b) => {
      if(a[type] < b[type]) { return -1; }
      if(a[type] > b[type]) { return 1; }
      return 0;
    });

    this.setState({
      results: sortedResults,
      sortType: type
    });
  }

  toggleAll = (index) => {
    console.log(index);
    document.querySelectorAll(`.row-${index} .info, .row-${index} .brand`).forEach(item => {
      console.log(item);
      item.classList.toggle('hidden');
    });
  }

  render() {
    return (
      <Container fluid className="container">
        <Header as='h2'>Quick Drug</Header>
        <Form className="form" onSubmit={this.submitHandler}>
          <div class="spacing">
            <Form.Field>
              <label>Search Drugs</label>
              <input placeholder='Enter generic or brand name' />
            </Form.Field>
            <Button color="blue" type='submit'>Submit</Button>
          </div>
          <div className="spacing">
            <b onClick={() => this.sortHandler('SECTIONS FROM CM')}>Key:&nbsp;&nbsp;&nbsp;</b>
            <div className="badge acute-cardiac"></div><span>-&nbsp;Acute Cardiac&nbsp;&nbsp;&nbsp;</span>
            <div className="badge dysrhythmia"></div><span>-&nbsp;Antidysrhythmic&nbsp;&nbsp;&nbsp;</span>
            <div className="badge perioperative"></div><span>-&nbsp;Perioperative&nbsp;&nbsp;&nbsp;</span>
            <div className="badge respiratory"></div><span>-&nbsp;Respiratory&nbsp;&nbsp;&nbsp;</span>
            <div className="badge fluid-con"></div><span>-&nbsp;Fluid Control&nbsp;&nbsp;&nbsp;</span>
            <div className="badge cell-reg"></div><span>-&nbsp;Cellular Regulation&nbsp;&nbsp;&nbsp;</span>
            <div className="badge infect"></div><span>-&nbsp;Anti-infective&nbsp;&nbsp;&nbsp;</span>
            <div className="badge vom"></div><span>-&nbsp;Anti-emetic&nbsp;&nbsp;&nbsp;</span>
            <div className="badge poo"></div><span>-&nbsp;Elimination&nbsp;&nbsp;&nbsp;</span>
          </div>
          <div className="row">
            <div className="col" onClick={() => this.sortHandler('DRUG')}>
              DRUG {this.state.sortType === 'DRUG' ? 'd' : ''}{this.state.sortType === 'BRAND NAME' ? 'b' : ''}
            </div>
            <div className="col" onClick={() => this.sortHandler('CLASS')}>
              CLASS {this.state.sortType === 'CLASS' ? 's' : ''}
            </div>
            <div className="col">MOA</div>
            <div className="col">INDICATIONS</div>
            <div className="col">CONTRAINDICATIONS</div>
            <div className="col">SIDE EFFECTS</div>
            <div className="col">IMPLICATIONS</div>
          </div>
          <div className="scroll"> 
            {this.state.results.map(( result, index ) => {
              let acuteCardiac = result['SECTIONS FROM CM'].includes('Acute Cardiac');
              let dysrhythmia = result['SECTIONS FROM CM'].includes('Antidysrhythmic');
              let perioperative = result['SECTIONS FROM CM'].includes('Perioperative');
              let respiratory = result['SECTIONS FROM CM'].includes('Respiratory');
              let fluidCon = result['SECTIONS FROM CM'].includes('Fluid Control');
              let cellReg = result['SECTIONS FROM CM'].includes('Cellular Regulation');
              let infect = result['SECTIONS FROM CM'].includes('Anti-infective');
              let vom = result['SECTIONS FROM CM'].includes('Anti-emetic');
              let poo = result['SECTIONS FROM CM'].includes('Elimination');

              return (
                <div className={`row row-${index}`} key={index}>
                  <div className="col" onClick={() => {this.toggleAll(index)}}>
                    {acuteCardiac ? <div className="badge acute-cardiac"></div> : ''}
                    {dysrhythmia ? <div className="badge dysrhythmia"></div>: ''}
                    {perioperative ? <div className="badge perioperative"></div>: ''}
                    {respiratory ? <div className="badge respiratory"></div>: ''}
                    {fluidCon ? <div className="badge fluid-con"></div>: ''}
                    {cellReg ? <div className="badge cell-reg"></div>: ''}
                    {infect ? <div className="badge infect"></div>: ''}
                    {vom ? <div className="badge vom"></div>: ''}
                    {poo ? <div className="badge poo"></div>: ''}
                    {result['DRUG']}
                    <div className="brand">{result['BRAND NAME']}</div>
                  </div>
                  <div className="col info">{result['CLASS']}</div>
                  <div className="col info">{result['MOA']}</div>
                  <div className="col info">{result['INDICATIONS']}</div>
                  <div className="col info">{result['CONTRAINDICATIONS']}</div>
                  <div className="col info">{result['SIDE EFFECTS']}</div>
                  <div className="col info">{result['IMPLICATIONS']}</div>
                </div>
              );
            })}
          </div>
        </Form>
      </Container>
    )
  }
}
