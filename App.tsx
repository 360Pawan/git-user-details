import dayjs from 'dayjs';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

function App(): JSX.Element {
  const [user, setUser] = useState('');
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    public_repos: 0,
    created_at: '',
    avatar_url: '',
  });
  const [showUserCard, setShowUserCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUser = async () => {
    if (!user) return Alert.alert('Username is required.');

    setLoading(true);

    try {
      const res = await fetch(`https://api.github.com/users/${user}`);
      const data = await res.json();

      if (data?.message === 'Not Found') {
        setLoading(false);
        setError(data?.message);
        return;
      }

      setUserDetails(data);
      setShowUserCard(true);
      setLoading(false);
      setError('');
      setUser('');
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <View style={styles.box}>
        {!showUserCard ? (
          <>
            <TextInput
              style={styles.input}
              value={user}
              onChangeText={text => setUser(text)}
              placeholder="Enter username"
            />
            {loading ? (
              <ActivityIndicator size={40} style={{marginTop: 30}} />
            ) : (
              <TouchableOpacity style={styles.button} onPress={fetchUser}>
                <Text style={styles.buttonText}>Fetch User Details</Text>
              </TouchableOpacity>
            )}
            {error ? <Text style={styles.error}>😒 {error}</Text> : null}
          </>
        ) : (
          <>
            <View style={styles.card}>
              <Image
                source={{
                  uri: userDetails?.avatar_url,
                }}
                style={styles.image}
              />
              <View style={styles.list}>
                <Text style={[styles.text, styles.textHeading]}>Name</Text>
                <Text style={[styles.text, styles.textDetail]}>
                  {userDetails?.name}
                </Text>
              </View>
              <View style={styles.list}>
                <Text style={[styles.text, styles.textHeading]}>Email</Text>
                <Text style={[styles.text, styles.textDetail]}>
                  {userDetails?.email}
                </Text>
              </View>
              <View style={styles.list}>
                <Text style={[styles.text, styles.textHeading]}>Bio</Text>
                <Text style={[styles.text, styles.textDetail]}>
                  {userDetails?.bio}
                </Text>
              </View>
              <View style={styles.list}>
                <Text style={[styles.text, styles.textHeading]}>Location</Text>
                <Text style={[styles.text, styles.textDetail]}>
                  {userDetails?.location}
                </Text>
              </View>
              <View style={styles.list}>
                <Text style={[styles.text, styles.textHeading]}>
                  Public Repos
                </Text>
                <Text style={[styles.text, styles.textDetail]}>
                  {userDetails?.public_repos}
                </Text>
              </View>
              <View style={styles.list}>
                <Text style={[styles.text, styles.textHeading]}>
                  Created at
                </Text>
                <Text style={[styles.text, styles.textDetail]}>
                  {dayjs(userDetails?.created_at).format('DD-MM-YYYY')}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowUserCard(false)}>
              <Text style={styles.buttonText}>Fetch Another</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f3f6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    flexGrow: 1,
  },

  box: {
    width: '100%',
  },

  input: {
    borderWidth: 2,
    borderColor: '#272343',
    width: '100%',
    padding: 20,
    borderRadius: 20,
    fontSize: 20,
  },

  button: {
    marginTop: 30,
    backgroundColor: '#ffd803',
    padding: 20,
    borderRadius: 20,
  },

  buttonText: {
    textAlign: 'center',
    color: '#272343',
    fontSize: 24,
    fontWeight: '600',
  },

  card: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
  },

  image: {
    width: 100,
    height: 100,
    marginBottom: 30,
    borderRadius: 100,
  },

  list: {
    width: '100%',
    flexDirection: 'row',
  },

  text: {
    fontSize: 18,
    marginBottom: 20,
  },

  textHeading: {
    width: '45%',
    fontWeight: '600',
  },

  textDetail: {
    width: '55%',
  },

  error: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#e53170',
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
});

export default App;
