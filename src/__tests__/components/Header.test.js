import Header from '../../components/Header';

function setup(overrides) {
  const store = initStore();
  const isConnected = true;
  const whiteListed = true;
  const showTerms = jest.fn();
  const props = { store, isConnected, whiteListed, showTerms, ...overrides };

  const wrapper = shallow(<Header {...props} />);

  return {
    wrapper,
    showTerms,
  };
}

describe('<Header />', () => {
  it('renders not connected and not whitelisted', () => {
    const { wrapper } = setup({ isConnected: false, whiteListed: false });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders connected not whitelisted', () => {
    const { wrapper } = setup({ whiteListed: false });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the component', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('handles events', () => {
    const { wrapper, showTerms } = setup({
      isConnected: true,
      whiteListed: true,
    });

    wrapper.find('.hamburger-btn').simulate('click');

    wrapper
      .find('#mobile-nav p')
      .simulate('click', { preventDefault: () => undefined });
    expect(showTerms).toBeCalledTimes(1);

    wrapper
      .find('#mobile-nav p')
      .simulate('click', { preventDefault: () => undefined });

    expect(wrapper).toMatchSnapshot();
  });

  it('handles empty showTerms', () => {
    const { wrapper } = setup({ showTerms: undefined });

    wrapper
      .find('#mobile-nav p')
      .simulate('click', { preventDefault: () => undefined });
  });
});
