import React from 'react';
import update from 'react-addons-update'; // Immutability Hepler 를 사용하기 위해 배열을 update를 진행할때...
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import ContactCreate from './ContactCreate';

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: -1,
      keyword: '',
      contactData: [
        {
          name: 'Abet',
          phone: '010-0000-0001',
        },
        {
          name: 'Betty',
          phone: '010-0000-0002',
        },
        {
          name: 'Charlie',
          phone: '010-0000-0003',
        },
        {
          name: 'David',
          phone: '010-0000-0004',
        },
      ],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.handleCreate = this.handleCreate.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentWillMount() {
    const { contactData } = localStorage;

    if (contactData) {
      this.setState({
        contactData: JSON.parse(contactData),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState.contactData) !==
      JSON.stringify(this.state.contactData)) { //  이전 값과 지금 값이 다르면 로컬 스토리지에 써라...
      localStorage.contactData = JSON.stringify(this.state.contactData);
    }
  }

  handleChange(e) {
    this.setState({
      keyword: e.target.value,
    });
  }

  handleClick(key) {
    this.setState({
      selectedKey: key,
    });

    console.log(key, 'is selected');
  }

  handleCreate(contact) {
    this.setState({
      contactData: update(this.state.contactData, {
        $push: [contact],
      }),
    });
  }

  handleRemove() {
    if (this.state.keyword < 0) {
      return;
    }
    this.setState({
      contactData: update(this.state.contactData, {
        $splice: [[this.state.selectedKey, 1]],
      }),
      selectedKey: -1,
    });
  }

  handleEdit(name, phone) {
    this.setState({
      contactData: update(this.state.contactData, {
        [this.state.selectedKey]: {
          name: { $set: name },
          phone: { $set: phone },
        },
      }),
    });
  }

  render() {
    const mapToComponents = (data) => {
      data.sort(); // 배열의 내용을 유니코드를 비교하여 오름차순..

      // 필터 : 이름에 서치에 적어준게 포함되어있을때만 검색을 하고 싶다.
      const filterData = data.filter((contact) => {
        const result = contact.name.toLowerCase().indexOf(this.state.keyword) > -1;
        return result;
      });
      // 걸러진 필터들을 보여주는 역활
      // 이벤트는 컴포넌트엔 적용이 안되고 네이티브 돔에게만 적용이 된다.
      return filterData.map((contact, i) => {
        const result =
          <ContactInfo contact={contact} key={i} onClick={() => this.handleClick(i)} />;
        return result;
      });
    };

    return (
      <div>
        <h1>Contacts!!!</h1>
        <input
          name="keyword"
          placeholder="Search"
          value={this.state.keyword}
          onChange={this.handleChange}
        />
        <div>{mapToComponents(this.state.contactData)}</div>
        <ContactDetails
          isSelected={this.state.selectedKey !== -1}
          contact={this.state.contactData[this.state.selectedKey]}
          onRemove={this.handleRemove}
          onEdit={this.handleEdit}
        />
        <ContactCreate
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}
