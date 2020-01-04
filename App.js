import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ApolloClient, gql} from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({uri: 'https://48p1r2roz4.sse.codesandbox.io'}),
});

const App = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    client
      .query({
        query: gql`
          {
            rates(currency: "EUR") {
              name
              currency
            }
          }
        `,
      })
      .then(result => {
        console.log(result);
        setData(result.data.rates);
      });
  }, []);
  return (
    <ApolloProvider client={client}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>List of currencies</Text>
              {data !== null ? (
                data.map(({name, currency}) => (
                  <Text key={currency}>
                    {name || 'Unknown name'} ({currency})
                  </Text>
                ))
              ) : (
                <Text>Fetching data...</Text>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
