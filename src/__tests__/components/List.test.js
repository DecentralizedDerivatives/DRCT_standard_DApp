import List from '../../components/List';

describe('<List />', () => {
  it('renders the component', () => {
    const refreshPage = jest.fn();

    const wrapper = shallow(
      <List store={initStore()} refreshPage={refreshPage} />
    ).dive();

    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({ listOrderError: 'Error happened.' });
    wrapper.setProps({ listOrderError: null });

    wrapper.setProps({ listOrderId: 42 });
    wrapper.setProps({ listOrderId: undefined });

    wrapper.setProps({ listOrderApproveError: 'Error happened.' });
    wrapper.setProps({ listOrderApproveError: undefined });

    wrapper.setProps({ listOrderApproved: true });
    wrapper.setProps({ listOrderApproved: undefined });

    wrapper.find('.order-btn').simulate('click');
    wrapper.find('.order-modal-background').simulate('click');
  });
});
