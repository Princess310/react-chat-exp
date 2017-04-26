/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import Footer from 'components/Footer';
import withProgressBar from 'components/ProgressBar';
import Grid from 'components/Grid';
import Gallery from 'components/Gallery';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

const AppWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

injectTapEventPlugin();
export function App(props) {
  return (
    <MuiThemeProvider>
      <AppWrapper>
        <Helmet
          titleTemplate="%s - 健康汇销"
          defaultTitle="健康汇销"
          meta={[
            { name: 'description', content: 'A React.js Boilerplate application' },
          ]}
        />
        {React.Children.toArray(props.children)}
        <Grid />
        <Gallery />
        <Footer />
      </AppWrapper>
    </MuiThemeProvider>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default withProgressBar(App);
