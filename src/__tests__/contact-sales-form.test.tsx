import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactSalesForm } from '@/components/contact-sales-form';

describe('ContactSalesForm', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('submits the form fields to the backend and shows a success state', async () => {
    const fetchMock = jest.fn().mockResolvedValue({ ok: true });
    global.fetch = fetchMock;
    const user = userEvent.setup();

    render(<ContactSalesForm />);

    await user.type(screen.getByLabelText('Your name'), 'Jane Doe');
    await user.type(screen.getByLabelText('Work email'), 'jane@example.com');
    await user.type(screen.getByLabelText('Funeral home name'), 'Doe Family Funeral Home');
    await user.type(screen.getByLabelText('Number of locations'), '5');
    await user.click(screen.getByRole('button', { name: 'Send to sales' }));

    await waitFor(() => screen.getByText('Request received'));

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/contact-sales'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          name: 'Jane Doe',
          email: 'jane@example.com',
          funeralHomeName: 'Doe Family Funeral Home',
          locationCount: 5,
          message: undefined,
        }),
      }),
    );
  });

  it('shows an error message if the submission fails', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 500 });
    const user = userEvent.setup();

    render(<ContactSalesForm />);

    await user.type(screen.getByLabelText('Your name'), 'Jane Doe');
    await user.type(screen.getByLabelText('Work email'), 'jane@example.com');
    await user.type(screen.getByLabelText('Funeral home name'), 'Doe Family Funeral Home');
    await user.type(screen.getByLabelText('Number of locations'), '5');
    await user.click(screen.getByRole('button', { name: 'Send to sales' }));

    await waitFor(() => screen.getByText(/something went wrong/i));
  });
});
