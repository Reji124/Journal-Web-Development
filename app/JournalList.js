
import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { getDatabase, ref, remove, onChildAdded, update, set, push } from 'firebase/database';
import { app } from '../Firebase/firebase';
import JournalCard from '../components/JournalCard';

export default function JournalList() {
  const [journalName, setJournalName] = useState('');
  const [journalDescription, setJournalDescription] = useState('');
  const [journals, setJournals] = useState([]);
  const [editingJournalId, setEditingJournalId] = useState(null);

  const database = getDatabase(app);
  const journalRef = ref(database, 'journals'); // Assuming 'journals' is the root node

  const fetchJournals = () => {
    const journalsData = [];
    const unsubscribe = onChildAdded(journalRef, (snapshot) => {
      const journal = snapshot.val();
      journalsData.push({ id: snapshot.key, ...journal });
      setJournals(journalsData);
    });

    // Don't forget to unsubscribe when the component unmounts
    return () => unsubscribe();
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  const handleAddOrUpdateJournal = () => {
    if (journalName.trim() === '' || journalDescription.trim() === '') {
      return;
    }

    const journal = {
      name: journalName,
      description: journalDescription,
    };
      
  console.log('Editing Journal ID:', editingJournalId);
  console.log('New Journal Key:', journalKey);

    const journalKey = editingJournalId || push(journalRef).key; // Use the editingJournalId if updating, or generate a new key if adding

    set(ref(database, `journals/${journalKey}`), journal)
      .then(() => {
        // Fetch the latest data after adding or updating a journal
        fetchJournals();
      })
      .catch((error) => {
        console.error('Error adding or updating journal:', error.message);
      })
      .finally(() => {
        setEditingJournalId(null);
        setJournalName('');
        setJournalDescription('');
      });
  };


  const handleEditJournal = (journalId) => {
    setEditingJournalId(journalId);
  
    const journalToEdit = journals.find((journal) => journal.id === journalId);
    setJournalName(journalToEdit.name);
    setJournalDescription(journalToEdit.description);
  };


  const handleDeleteJournal = (journalId) => {
    console.log('Deleting journal with ID:', journalId);
 
    const journalRef = ref(database, `journals/${journalId}`);
    remove(journalRef)
      .then(() => {
        console.log('Journal deleted successfully');
        // Update state only after successful deletion
        setJournals((prevJournals) => prevJournals.filter((journal) => journal.id !== journalId));
        // Clear any local state related to the deleted journal
      })
      .catch((error) => {
        console.error('Error deleting journal:', error.message);
      });
  };
 


  const exitJournal = () => {
    router.replace('/HomePage');
  };


  return (
    <ImageBackground
      source={{
        uri: 'https://wallpapers.com/images/hd/blank-white-background-xbsfzsltjksfompa.jpg',
      }}
      style={styles.backgroundImage}
    >
      <View style={styles.epiksOverlay} />
      <ScrollView>
        <View style={styles.outerContainer}>
          <View style={styles.innerContainer}>
            <Text>Title</Text>
            <TextInput
              style={styles.inputText}
              value={journalName}
              onChangeText={(text) => setJournalName(text)}
            />
            <Text>Body</Text>
            <TextInput
              style={{ ...styles.inputText, ...styles.inputDes }}
              value={journalDescription}
              onChangeText={(text) => setJournalDescription(text)}
              multiline
            />
            <TouchableOpacity onPress={handleAddOrUpdateJournal} style={styles.addJournal}>
              <Text style={styles.addJournalText}>{editingJournalId ? 'Update Journal' : 'Add Journal'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={exitJournal} style={styles.exitBtn}>
              <Text style={styles.exitText}>Exit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.JournalListContainer}>
          { journals.map((journal) => (
                                        <JournalCard
                                          key={journal.id}
                                          name={journal.name}
                                          description={journal.description}
                                          onDelete={() => handleDeleteJournal(journal.id)}
                                          onEdit={() => handleEditJournal(journal.id)}
                                        />
                                      ))}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}




const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },








  epiksOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },








  outerContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },








  innerContainer: {
    width: '80%',
    padding: 20,
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: 'white',
  },








  inputText: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },








  inputDes: {
    height: 100,
  },








  addJournal: {
    backgroundColor: "#D7C49EFF",
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    borderRadius: 25,
  },




  addJournalText: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },


  exitBtn: {
    backgroundColor:'#343148FF',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    borderRadius: 25,
  },


  exitText: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },

  JournalListContainer: {
    width: '80%',
  },
});


