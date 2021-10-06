import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, ActivityIndicator, ScrollView} from 'react-native';
import {Text, Input, ListItem, Overlay} from 'react-native-elements';
import {getJobs, createJob} from '../api/axleRecordsApi/jobs';
import {createJobProfile, getJobProfiles, deleteJobProfile, updateJobProfile} from '../api/axleRecordsApi/jobProfiles';
import {Button} from '../components';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CardList as overlayStyles } from '../styles';
import { Edit, BinIcon, EyeIcon } from '../assets';
import {buttonGrey} from '../styles/colors';

export default function({navigation, route}) {
  const [loading, setLoading] = useState();
  const [jobs, setJobs] = useState();
  const [jobProfiles, setJobProfiles] = useState([]);
  const [selectedJobIds, setSelectedJobIds] = useState([]);
  const [descriptionOverlayVisible, setDescriptionOverlayVisible] = useState(false);
  const [priceOverlayVisible, setPriceOverlayVisible] = useState(false);
  const [userDefinedJobOverlayVisible, setUserDefinedJobOverlayVisible] = useState(false);
  const [jobDescriptionToDisplay, setJobDescriptionToDisplay] = useState();
  const [priceUpdateData, setPriceUpdateData] = useState({});
  const [userDefinedJobName, setUserDefinedJobName] = useState();
  const [userDefinedJobDescription, setUserDefinedJobDescription] = useState();
  const jobsRef = useRef(null);
  const shopId = useRef(null);

  const refreshJobs = async () => {
    const jobsList = await getJobs();
    // keeping name as empty string since it shows up on top of the list as a category
    setJobs([{name: '', children: jobsList}]);
  };

  const refreshJobProfiles = async () => {
    // shopId.current will be set in the useEffect
    const jobProfilesList = await getJobProfiles(shopId.current)
    setJobProfiles(jobProfilesList.map((jobProfile) => {
      return {
        id: jobProfile.id,
        title: jobProfile.job.name,
        description: jobProfile.job.description,
        price: jobProfile.price
      }
    }));
  }

  useEffect(() => {
    (async () => {
      shopId.current = route.params.shopId;
      await Promise.all([refreshJobs(), refreshJobProfiles()]);
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
    await Promise.all(selectedJobIds.map((jobId) => {
      return createJobProfile({shopId: shopId.current, jobId})
    }));
    await refreshJobProfiles();
    jobsRef && jobsRef.current && jobsRef.current._removeAllItems();
  }

  const onDelete = async (jobProfileId) => {
    await deleteJobProfile(jobProfileId);
    await refreshJobProfiles();
  }

  const openDescriptionOverlay = () => {
    setDescriptionOverlayVisible(true);
  };

  const closeDescriptionOverlay = () => {
    setDescriptionOverlayVisible(false);
  };

  const onView = (description) => {
    setJobDescriptionToDisplay(description);
    openDescriptionOverlay();
  }

  const openPriceOverlay = () => {
    setPriceOverlayVisible(true);
  };

  const closePriceOverlay = () => {
    setPriceOverlayVisible(false);
  };

  const onPriceEditClick = (id, price) => {
    setPriceUpdateData({id, price});
    openPriceOverlay();
  }

  const onPriceChangeSave = async () => {
    await updateJobProfile(priceUpdateData.id, {price: priceUpdateData.price});
    await refreshJobProfiles();
    closePriceOverlay()
  }

  const openUserDefinedJobOverlay = () => {
    setUserDefinedJobOverlayVisible(true);
  };

  const closeUserDefinedJobOverlay = () => {
    setUserDefinedJobOverlayVisible(false);
  };

  const onAddUserDefinedJob = async () => {
    const job = await createJob({name: userDefinedJobName, description: userDefinedJobDescription});
    createJobProfile({ shopId: shopId.current, jobId: job.id });
    await Promise.all([refreshJobs(), refreshJobProfiles()]);
    closeUserDefinedJobOverlay();
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
              selectText="Select jobs from the list"
              searchPlaceholderText='Search here (eg: "oil change" or "wheel balancing")'
              onSelectedItemsChange={(selectedItemIds) => {
                setSelectedJobIds(selectedItemIds);
              }}
              onCancel={onCancel}
              onConfirm={onConfirm}
              showCancelButton={true}
              selectedItems={selectedJobIds}
              showChips={true}
              ref={jobsRef}
            />

            <Button title='Add selected jobs' onPress={addSelectedJobs} />
            <Text style={styles.cannotFindLink} onPress={openUserDefinedJobOverlay}>
              Couldn't find what you were looking for? Click here to add.
            </Text>
          </ScrollView>
        )}
      </View>

      {/* Jobs list for the shop */}
      <View style={styles.listContainer}>
        <View>
          <Text h4>Jobs that you support:</Text>
          <View style={styles.titleDivider}/>
        </View>
        <FlatList
          data={jobProfiles}
          keyExtractor={(item => item.id.toString())}
          renderItem={({item}) => (
            <ListItem bottomDivider topDivider>
              <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
              </ListItem.Content>
              <View style={styles.divider}></View>
              <View style={styles.price} >
                <Text style={{fontSize: 24}} onPress={()=>{onPriceEditClick(item.id, item.price)}}>{item.price||`₹ -`}</Text>
              </View>
              <View style={styles.divider}></View>
              <EyeIcon onPress={()=>{onView(item.description)}} />
              <View style={styles.divider}></View>
              <BinIcon onPress={()=>{onDelete(item.id)}} />
            </ListItem>
          )}
        />
      </View>

      {/* modal to display job item details */}
      <Overlay
        overlayStyle={overlayStyles.editOverlay}
        isVisible={descriptionOverlayVisible}
        onBackdropPress={closeDescriptionOverlay}
      >
        <ScrollView>
          <Text h4>Description:</Text>
          <View style={{height: 10}}></View>
          <Text>{jobDescriptionToDisplay}</Text>
        </ScrollView>
      </Overlay>

      {/* modal to display edit price */}
      <Overlay
        overlayStyle={overlayStyles.editOverlay}
        isVisible={priceOverlayVisible}
        onBackdropPress={closePriceOverlay}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flex: 8 }}>
            <Input
              defaultValue={priceUpdateData.price}
              rightIcon={<Edit />}
              keyboardType='numeric'
              maxLength={7}
              onChangeText={(price) =>
                setPriceUpdateData({id: priceUpdateData.id, price})
              }
            />
            <Button type="solid" title="Save" onPress={onPriceChangeSave}/>
          </View>
        </View>
      </Overlay>

      {/* modal to add a user defined job */}
      <Overlay
        overlayStyle={overlayStyles.editOverlay}
        isVisible={userDefinedJobOverlayVisible}
        onBackdropPress={closeUserDefinedJobOverlay}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flex: 8 }}>
            <Input
              placeholder='Name of the job'
              maxLength={50}
              onChangeText={(name) => setUserDefinedJobName(name) }
            />
            <Input
              placeholder='Description'
              maxLength={100}
              onChangeText={(description) => setUserDefinedJobDescription(description) }
            />
            <Button title="Add" onPress={onAddUserDefinedJob} />
            <View style={{height: 5}}/>
            <Button color={buttonGrey} title="Cancel" onPress={closeUserDefinedJobOverlay} />
          </View>
        </View>
      </Overlay>

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
    paddingHorizontal: 0
  },
  titleDivider: {
    height: 1,
    width: '100%',
    backgroundColor: 'black',
    marginTop: 4,
    marginBottom: 8
  },
  cannotFindLink: {
    paddingVertical: 5,
    color: 'blue',
    textDecorationLine: 'underline'
  },
  price: {
    flexDirection: 'row'
  }
});
