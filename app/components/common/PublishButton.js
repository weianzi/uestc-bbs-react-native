import React, {
  Component,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class PublishButton extends Component {
  render() {
    return (
      <Icon
        style={this.props.style}
        name='pencil-square-o'
        size={18}
        onPress={this.props.onPress} />
    );
  }
}
