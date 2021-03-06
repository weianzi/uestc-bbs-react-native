import React, {
  Component,
  View,
  Text,
  TextInput,
  AlertIOS,
  AsyncStorage,
  Navigator,
  Modal,
} from 'react-native';
import Button from 'apsl-react-native-button';
import styles from '../../styles/components/modal/_LoginModal';
import { userLogin, resetAuthrization, resetAuthrizationResult } from '../../actions/authorizeAction';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: !!this.props.visible,
      userName: '',
      password: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    let { isFetching, authrization, hasError, result } = nextProps.user;

    if (hasError) {
      AlertIOS.alert('提示', authrization.errcode);
      nextProps.dispatch(resetAuthrization());
    }

    if (result) {
      this.props.dispatch(resetAuthrizationResult());
      authrization = JSON.stringify(authrization);
      AsyncStorage.setItem('authrization', authrization)
        .then(() => {
          this.context.menuActions.close();
          this.props.router.toHome();
          this._closeLoginModal();
        });
    }
  }

  _openLoginModal() {
    this.setState({
      isModalOpen: true
    });
  }

  _closeLoginModal() {
    this.setState({
      isModalOpen: false,
      userName: '',
      password: ''
    });
  }

  render() {
    let { isFetching } = this.props.user;
    let { userName, password } = this.state;
    let isDisabled = !userName || !password || isFetching;

    return (
      <Modal
        animated={true}
        transparent={false}
        style={styles.container}
        visible={this.state.isModalOpen}>
        <Text
          style={styles.close}
          onPress={() => this._closeLoginModal()}>
          &times;
        </Text>
        <View style={styles.top}>
          <Text style={styles.title}>清水河畔</Text>
          <Text style={styles.subTitle}>React Native简易版</Text>
        </View>
        <View style={styles.form}>
          <TextInput
            value={this.state.userName}
            style={[styles.formItem, styles.formInput]}
            onChangeText={text => this.setState({ userName: text })}
            placeholder='请输入用户名'
            autoFocus={true} />
          <TextInput
            value={this.state.password}
            style={[styles.formItem, styles.formInput]}
            onChangeText={text => this.setState({ password: text })}
            placeholder='请输入密码'
            secureTextEntry={true} />
          <Button
            style={[styles.formItem, styles.formSubmit]}
            textStyle={styles.formSubmitText}
            isDisabled={isDisabled}
            isLoading={isFetching}
            onPress={() => this.props.dispatch(userLogin(userName, password))}>
            登录
          </Button>
        </View>
      </Modal>
    );
  }
}

Login.contextTypes = {
  menuActions: React.PropTypes.object.isRequired
}
