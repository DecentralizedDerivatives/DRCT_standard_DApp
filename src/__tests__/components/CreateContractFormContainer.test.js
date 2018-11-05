import CreateContractFormContainer, {
  validate,
} from '../../components/CreateContractFormContainer';

describe('<CreateContractFormContainer />', () => {
  it('renders the component', async () => {
    const wrapper = shallow(<CreateContractFormContainer store={initStore()} />)
      .dive()
      .dive()
      .dive()
      .dive();

    wrapper.find('CreateContractFormComponent').simulate('submit');

    wrapper
      .find('CreateContractFormComponent')
      .simulate('currencyChange', { target: { value: '0x000...' } });

    expect(wrapper).toMatchSnapshot();
  });

  it('validates values', () => {
    const incorrect = {};
    const correct = {
      duration: '1',
      currency: 'ETH',
      startDate: '10/26/2018',
      amount: '1',
    };

    expect(validate(incorrect)).toMatchSnapshot();
    expect(validate(correct)).toMatchSnapshot();
  });
});
