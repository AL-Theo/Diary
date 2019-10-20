import React, { useContext, useEffect } from 'react';

import { View,
         Text,
         StyleSheet, 
         FlatList,
         TouchableOpacity } from 'react-native';

import { Context } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';


const IndexScreen = ({ navigation }) => {
    const { state, deleteBlogPost, getBlogPosts } = useContext(Context);
    
    //Gets data created and returns for viewing in the main screen(IndexScreen) or removes it
    useEffect(() => {
      getBlogPosts();
  
      const listener = navigation.addListener('didFocus', () => {
        getBlogPosts();
      });

      return () => {
        listener.remove();
      };
    }, []);

    
    return(
        <View >
            <FlatList 
                data={state}
                keyExtractor={blogPost => blogPost.title}
                renderItem={({ item }) => {
                    return(
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('Show', { id: item.id })}
                        >
                        <View style={styles.row}>
                            <Text style={styles.title}>
                                {item.title} - {item.id}
                            </Text>
                            <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                                <Feather style={styles.icon} name="trash" />
                            </TouchableOpacity>
                        </View>
                     </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

IndexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: (
            <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                <Feather name="plus" style={styles.plus} />
            </TouchableOpacity>
        )
    };
};


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: 'gray'
    },
    title: {
        fontSize: 18
    },
    icon: {
        fontSize: 24
    },
    plus: {
        fontSize: 30,
        marginRight: 10
    }
});


export default IndexScreen