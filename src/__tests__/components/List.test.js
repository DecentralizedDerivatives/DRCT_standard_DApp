import List from '../../components/List';

function setup(overrides) {
  const store = initStore();

  const refreshPage = jest.fn();
  const props = { store, refreshPage, ...overrides };

  const wrapper = shallow(<List {...props} />).dive();

  return {
    wrapper,
  };
}

describe('<List />', () => {
  it('renders the component', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders list error', () => {
    const { wrapper } = setup();
    wrapper.setProps({ listOrderError: 'Error happened.' });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders list id', () => {
    const { wrapper } = setup();
    wrapper.setProps({ listOrderId: '42' });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders approved error', () => {
    const { wrapper } = setup();
    wrapper.setProps({ listOrderApproveError: 'Error happened.' });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders approved', () => {
    const { wrapper } = setup();
    wrapper.setProps({ listOrderApproved: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('handles empty setProps', () => {
    const { wrapper } = setup();
    wrapper.setProps({});
    expect(wrapper).toMatchSnapshot();
  });

  it('handles modal', () => {
    const { wrapper } = setup();

    // open modal
    wrapper.find('.order-btn').simulate('click');
    expect(wrapper).toMatchSnapshot();

    // close modal
    wrapper.find('.order-modal-background').simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
});
