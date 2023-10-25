import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import OnTv from 'views/page/OnTv';
import Streaming from 'views/page/Streaming';
import TopRated from 'views/page/TopRated';
import { Container } from 'reactstrap';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#C3C3C6',
    // backgroundColor: theme.palette.background.paper,
    width: "100%"
  },
}));

export default function Tablet() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className='section section-download'>
        <Container style={{margin:"auto"}}>
        <img alt="..." className="path" src={require("assets/img/path1.png")} />
        <h2 className="title">
              TV & Series
            </h2>
        {/* <AppBar position="static" color="default"> */}
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          // style={{color:"white"}}
        >
          <Tab label="Streaming" {...a11yProps(0)} />
          <Tab label="On TV" {...a11yProps(1)} />
          <Tab label="Top Rated " {...a11yProps(2)} />
        </Tabs>
      {/* </AppBar> */}
    <div className={classes.root}>
      
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
            <Streaming/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
            <OnTv/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
            <TopRated />
        </TabPanel>
      </SwipeableViews>
    </div>
    </Container>
    </div>
  );
}
