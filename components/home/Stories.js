import React from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Divider } from 'react-native-elements'
import { USERS } from '../../data/users'
const Stories = () => {
    return (
        <View style={styles.container}>

            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={USERS}
                renderItem={({ item }) => (
                    <View style={styles.story}>

                        <Image source={{ uri: item.image }} style={styles.image} />
                        <Text numberOfLines={1} style={{ color: "white" }}>{item.user}</Text>
                    </View>
                )}

            />
            <Divider style={{ marginTop: 10 }} width={1} color="#242424" orientation="horizontal" />
        </View>
    )
}

export default Stories

const styles = StyleSheet.create({
    container: {
        marginBottom: 13,
    },
    image: {
        height: 70,
        width: 70,
        resizeMode: "cover",
        borderRadius: 50,
        borderWidth: 3,
        borderColor: "#ff8501"
    },
    story: {
        marginLeft: 5,
        width: 80,
        alignItems: "center",
    }
})
