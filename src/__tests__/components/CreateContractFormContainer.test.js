import CreateContractFormContainer, {
  validate,
} from '../../components/CreateContractFormContainer';
import { getContractOpenDates } from '../../actions/contractActions';
import { sendCreateContractOrder } from '../../actions/orderActions';

jest.mock('../../actions/contractActions');
getContractOpenDates.mockImplementation(() => () => undefined);

jest.mock('../../actions/orderActions');
sendCreateContractOrder.mockImplementation(() => () => undefined);

function setup(overrides) {
  const store = initStore();

  const props = { store, ...overrides };

  const wrapper = shallow(<CreateContractFormContainer {...props} />)
    .dive()
    .dive()
    .dive()
    .dive();

  return {
    wrapper,
  };
}

describe('<CreateContractFormContainer />', () => {
  it('renders the component', async () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('handles submit', async () => {
    const { wrapper } = setup();

    wrapper.find('CreateContractFormComponent').simulate('submit');

    expect(sendCreateContractOrder).toBeCalledTimes(1);
  });

  it('handles currency change', async () => {
    const { wrapper } = setup();

    wrapper
      .find('CreateContractFormComponent')
      .simulate('currencyChange', { target: { value: '0x000...' } });

    expect(getContractOpenDates).toBeCalledTimes(1);
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
