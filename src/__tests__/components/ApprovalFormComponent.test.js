import ApprovalFormComponent from '../../components/ApprovalFormComponent';

describe('<ApprovalFormComponent />', () => {
  it('renders the component', () => {
    const handleSubmit = jest.fn();
    const store = initFixtureStore();
    const wrapper = shallow(
      <ApprovalFormComponent
        store={store}
        handleSubmit={handleSubmit}
        selectOptions={store.getState().user.userTokens}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
