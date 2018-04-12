import React from "react";
import {
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Button,
} from "react-native";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: '001',
          title: 'javascript'
        },
        {
          id: '002',
          title: 'php'
        },
        {
          id: '003',
          title: 'c#'
        },
        {
          id: '004',
          title: 'html'
        },
        {
          id: '005',
          title: 'css'
        }
      ]
    }
  }

  editItem = (item) => {
    //this.state.data is a final result
    const {data} = this.state;
    let newData = data.map((o, i) => {
      if(o.id === item.id){
        return {
          id: o.id,
          title: item.title + " is updated"
        }
      }
      return o;
    });
    this.setState({data: newData})
  };

  removeItem = (id) => {
    const {data} = this.state;
    let newData = data.filter((o, i) => {
      return o.id !== id
    });
    this.setState({data: newData})
  };

  render() {
    const {data} = this.state;
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <Item
              item={item}
              editItem={this.editItem}
              removeItem={this.removeItem}
            />
          )}
          keyExtractor={(item, index) => item.id}
        />
      </View>
    )
  }
}

class Item extends React.PureComponent {

  render() {
    const {item, editItem, removeItem} = this.props;
    return (
      <TouchableHighlight
        onPress={() => null}
        style={{
          flex: 1,
          marginBottom: 2,
          backgroundColor: '#79b7a6',
        }}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text>{item.title}</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Button title="Edit"
                    onPress={() => editItem(item)}
            />
            <Button title="Remove"
                    onPress={() => removeItem(item.id)}
            />
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}


if(isShare){
          
  singleShare = async() =>  await axios.get('/post/share/'+post.id).then(res =>{ return res.data});
  singlePost = async() => await axios.get('/post/post/'+id).then(res =>{ return res.data});
  singleShare().then(res =>{
    let resShare = res;
    singlePost().then(res => {
      let resPost = res
      data = {
        share : {
          val : resShare,
          id : post.post_type+'_'+post.id
        },
        post :{
          val : resPost,
          id : post.post_type+'_'+post.post.id
        },
        isShare : isShare
      }
      this.props.editItem(data)

    })
  })
}else{
singlePost = async() => await axios.get('/post/post/'+id).then(res =>{ return res.data});
singlePost().then(res => {
  data = {
    post :{
      val : res,
      id : post.post_type+'_'+id
    },
    isShare : isShare
  }
  this.props.editItem(data)
})
}