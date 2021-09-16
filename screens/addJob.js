import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, ActivityIndicator, ScrollView} from 'react-native';
import {Text, ListItem} from 'react-native-elements';
import {getJobs} from '../api/axleRecordsApi/jobs';
import {createJobProfile, getJobProfiles} from '../api/axleRecordsApi/jobProfiles';
import {Button} from '../components';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { FlatList } from 'react-native';
import { Entypo, FontAwesome, AntDesign, EvilIcons, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export default function({navigation, route}) {
  const [loading, setLoading] = useState();
  const [jobs, setJobs] = useState();
  const [jobProfiles, setJobProfiles] = useState([]);
  const [selectedJobIds, setSelectedJobIds] = useState([]);
  const jobsRef = useRef(null);
  const shopId = useRef(null);

  useEffect(() => {
    (async () => {
      console.log('route params: ', route.params.shopId)
      shopId.current = route.params.shopId;
      const jobsListPromise = getJobs();
      const jobProfilesPromise = getJobProfiles(shopId.current);
      const [jobsList, jobProfilesList] = await Promise.all([jobsListPromise, jobProfilesPromise]);
      setJobs([{name: 'jobs', children: jobsList}]);
      // setJobProfiles(jobProfilesList.map((jobProfile) => {
      //   return {
      //     title: (jobsList.find(job => jobProfile.job_id===job.id)).name, // job profile name is taken from job
      //     id: jobProfile.id
      //   }
      // }));

      setJobProfiles([
        {title: 'this', id: 1}, 
        {title: 'that', id: 2},
        {title: 'that', id: 3},
        {title: 'that', id: 4},
        {title: 'that', id: 5},
        {title: 'that', id: 6},
        {title: 'that', id: 8},
        {title: 'that', id: 9},
        {title: 'that', id: 10},
        {title: 'that', id: 11},
        {title: 'ttetet', id: 12},
        {title: 'sdfs', id: 13},
        {title: 'lst', id: 14},
      ]);
    })();
  }, [navigation, route])

  const onCancel = () => {
    setSelectedJobIds([]);
    jobsRef?.current?._toggleSelector();
  }

  const onConfirm = () => {
    jobsRef?.current?._toggleSelector();
  }

  const addSelectedJobs = async () => {
    console.log('selectedJobIds: ', selectedJobIds);
    console.log('shopId.current: ', shopId.current);
    await Promise.all(selectedJobIds.map((jobId) => {
      return createJobProfile({shopId: shopId.current, jobId})
    }));
  }

  return (
    <View style={styles.container}>
      <View style={styles.selectionContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <ScrollView>
            <SectionedMultiSelect
              showDropDowns={false}
              items={jobs}
              IconRenderer={MaterialIcons}
              noItemsComponent={<ActivityIndicator size="large" color="#0000ff" />}
              uniqueKey="id"
              readOnlyHeadings={true}
              subKey="children"
              selectText="Select jobs"
              searchPlaceholderText='Search here (eg: "oil change" or "wheel balancing")'
              onSelectedItemsChange={(selectedItemIds) => {
                console.log('selected items; ', selectedItemIds);
                setSelectedJobIds(selectedItemIds);
              }}
              onCancel={onCancel}
              onConfirm={onConfirm}
              showCancelButton={true}
              selectedItems={selectedJobIds}
              showChips={true}
              ref={jobsRef}
            />

            <Button title='Add selected jobs' color='red' onPress={addSelectedJobs} />
          </ScrollView>
        )}
      </View>

      {/* Jobs list for the shop */}
      <View style={styles.listContainer}>
        <View>
          <Text h4>Jobs List: </Text>
          <View style={styles.titleDivider}/>
        </View>
        <FlatList
          data={jobProfiles}
          keyExtractor={(item => item.id.toString())}
          renderItem={({item}) => (
            <TouchableOpacity>
              <ListItem bottomDivider topDivider>
                <ListItem.Content>
                  <ListItem.Title>{item.title}</ListItem.Title>
                </ListItem.Content>
                <View style={styles.divider}></View>
                <FontAwesome name="rupee" size={18} color="black" />
                <Text style={{fontSize: 24}}>0</Text>
                <View style={styles.divider}></View>
                <Ionicons name="eye-outline" size={20} color="blue" />
                <View style={styles.divider}></View>
                <AntDesign name="delete" size={20} color="red" />
              </ListItem>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1
  },
  selectionContainer: {
    flex: 1
  },
  listContainer: {
    flex: 2
  },
  divider: {
    backgroundColor: 'grey',
    width: 1,
    height: '100%',
  },
  titleDivider: {
    height: 1,
    width: '100%',
    backgroundColor: 'black',
    marginTop: 4,
    marginBottom: 8
  }
});
