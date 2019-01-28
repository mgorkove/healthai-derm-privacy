import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { BounceLoader } from 'react-spinners';
import classNames from 'classnames/bind';

const filenames = [
  "acne_",
  "lupus_",
  "shingles_",
];

const similarityScores = {
  "acne_f_f_f": 100,
  "acne_f_t_f": 75,
  "acne_t_f_f": 63,
  "acne_f_f_t": 48,
  "acne_t_t_f": 56,
  "acne_t_f_t": 47,
  "acne_f_t_t": 43,
  "acne_t_t_t": 45,
  "lupus_f_f_f": 100,
  "lupus_f_t_f": 71,
  "lupus_t_f_f": 77,
  "lupus_f_f_t": 8,
  "lupus_t_t_f": 65,
  "lupus_t_f_t": 77,
  "lupus_f_t_t": 7,
  "lupus_t_t_t": 66,
  "shingles_f_f_f": 100,
  "shingles_f_t_f": 68,
  "shingles_t_f_f": 53,
  "shingles_f_f_t": 59,
  "shingles_t_t_f": 46,
  "shingles_t_f_t": 51,
  "shingles_f_t_t": 49,
  "shingles_t_t_t": 43,
}

class App extends Component {
  state = {
    eyebrows: false,
    eyes: false,
    lips: false,
    loading: false,
    selectedIndex: 0,
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.checked,
      loading: true,
    });
    setTimeout(() => {
      this.setState({loading: false});
    }, 800);
  };

  render() {
    const { eyes, lips, eyebrows } = this.state;

    // var filename = "t_t.png";
    var baseFilename = filenames[this.state.selectedIndex];
    var filename = "";

    var originalAcne = "acne_f_f_f.jpg";
    var originalLupus = "lupus_f_f_f.jpg";
    var originalShingles = "shingles_f_f_f.jpg";
    var similarityScore;

    if (eyes === true && lips === true && eyebrows === true) {
      filename = baseFilename + "t_t_t";
      similarityScore = similarityScores[filename];
    } else if (eyes === false && lips === true && eyebrows === false) {
      filename = baseFilename + "f_t_f";
      similarityScore = similarityScores[filename];
    } else if (eyes === true && lips === false && eyebrows === false) {
      filename = baseFilename + "t_f_f";
      similarityScore = similarityScores[filename];
    } else if (eyes === false && lips === false && eyebrows === true) {
      filename = baseFilename + "f_f_t";
      similarityScore = similarityScores[filename];
    } else if (eyes === true && lips === true && eyebrows === false) {
      filename = baseFilename + "t_t_f";
      similarityScore = similarityScores[filename];
    } else if (eyes === true && lips === false && eyebrows === true) {
      filename = baseFilename + "t_f_t";
      similarityScore = similarityScores[filename];
    } else if (eyes === false && lips === true && eyebrows === true) {
      filename = baseFilename + "f_t_t";
      similarityScore = similarityScores[filename];
    } else if (eyes === false && lips === false && eyebrows === false) {
      filename = baseFilename + "f_f_f";
      similarityScore = similarityScores[filename];
    }

    filename += ".jpg";
    baseFilename += "f_f_f.jpg";

    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Technology demo of the de-identification of facial data for dermatological applications
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container spacing={24} className="intro-grid">
          <Paper className="intro-paper">
            <Grid container spacing={12}>
              <Grid item xs={3}>
                <img src="logo.png" className="logo"/>
              </Grid>
              <Grid item xs={9}>
                <p>
                  This tool utilizes facial recognition and image detection technologies to obfucaste personally identifiable features of the face, like eyes, lips and eyebrows, in dermatological images. Deidentification tools like this one allow facial photos used in dermatology to be processed and stored in a way that respects privacy and security. Select which facial features you would like to remove, and let our tool do the rest.
                </p>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid container spacing={24} className="top-grid">
          <Grid item xs={3} className="bottom-grid">
            <Paper className="paper">
              <FormLabel component="legend" className="label">Select a base image:</FormLabel>
              <Grid container>
                <Grid item xs={4}>
                  <img src={originalAcne} className={classNames("icon", this.state.selectedIndex === 0 && "selected")} onClick={() => this.setState({selectedIndex: 0})}/>
                </Grid>
                <Grid item xs={4}>
                  <img src={originalLupus} className={classNames("icon", this.state.selectedIndex === 1 && "selected")} onClick={() => this.setState({selectedIndex: 1})}/>
                </Grid>
                <Grid item xs={4}>
                  <img src={originalShingles} className={classNames("icon", this.state.selectedIndex === 2 && "selected")} onClick={() => this.setState({selectedIndex: 2})}/>
                </Grid>
              </Grid>
              <FormLabel component="legend" className="label">Select features to remove:</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox checked={eyes} onChange={this.handleChange('eyes')} value="eyes" />
                  }
                  label="Eyes"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={lips} onChange={this.handleChange('lips')} value="lips" />
                  }
                  label="Lips"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={eyebrows} onChange={this.handleChange('eyebrows')} value="eyebrows" />
                  }
                  label="Eyebrows"
                />
              </FormGroup>
              <FormLabel component="legend" className="label">Original Image:</FormLabel>
              <img className="smallImage" src={baseFilename}/>
            </Paper>
          </Grid>
          <Grid item xs={9} className="bottom-grid">
            <Paper className="paper">
              {this.state.loading && <BounceLoader
                sizeUnit={"px"}
                css={"margin: 0 auto; margin-top: 200px;"}
                size={100}
                color={'#123abc'}
                loading={true}
              />}
              {!this.state.loading && <div className="similarity">Similarity Score: {similarityScore} %</div>}
              {!this.state.loading && <img className="fullImage" src={filename}/>}
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
