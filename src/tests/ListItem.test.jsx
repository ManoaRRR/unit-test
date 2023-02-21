import { render, screen, fireEvent } from '@testing-library/react';
import App from "../App";

import { ListItem } from "../ListItem";

const mockOnCheck = jest.fn();

describe('ListItem', () => {
    it('display value correctly', () => {
        const { getByText } = render(
            <ListItem
                id='list-item-test'
                checkable={true}
                onCheck={mockOnCheck}
                item='Lorem ipsum dolor sit amet consectetur'
            />
        );

        const value = getByText('Lorem ipsum dolor sit amet consectetur');
        expect(value).toBeInTheDocument();
    });
    
    it('checkbox is shown', () => {
        const { getByTestId } = render(
            <ListItem
                id='list-item-1'
                checkable={true}
                onCheck={mockOnCheck}
                item='Lorem ipsum dolor sit amet consectetur'
            />
        );

        const value = getByTestId('test-list-item-1');
        expect(value).toBeInTheDocument();
    });

    it('checkbox is hidden', () => {
        const { getByTestId, debug } = render(
            <ListItem
                id='list-item-1'
                checkable={false}
                onCheck={mockOnCheck}
                item='Lorem ipsum dolor sit amet consectetur'
            />
        );
        const node = getByTestId('test-list-item-1-container');
        expect(node.children).toHaveLength(1);
    });
    
    it('callback is called', () => {
        const onCheck = jest.fn(); // Créer une fonction de rappel simulée
        render(<App />);
        const todoList = screen.getByRole('list', { name: /Todo List/i });
        const firstItemCheckbox = screen.getByRole('checkbox', { name: /First item/i });
        fireEvent.click(firstItemCheckbox); // Simuler le clic sur la case à cocher du premier élément
        expect(onCheck).toHaveBeenCalledWith(expect.any(Object), 'First item', 0);
    });

    it('callback is not called when not checkable', () => {
        const onCheck = jest.fn();
        const todoItems = ["Buy milk", "Walk the dog"];
        render(
            <List items={todoItems} onCheck={onCheck}>
                <Input />
            </List>
        );
    
        const checkboxes = screen.getAllByRole("checkbox");
        expect(checkboxes).toHaveLength(0);
    
        userEvent.click(screen.getByText("Buy milk"));
        userEvent.click(screen.getByText("Walk the dog"));
        expect(onCheck).not.toHaveBeenCalled();

    });

    it('matches saved snapshot', () => {
        const tree = render(
            <ListItem
                id='list-item-test'
                checkable={true}
                onCheck={mockOnCheck}
                item='Lorem ipsum dolor sit amet consectetur'
            />
        );
        expect(tree).toMatchSnapshot();
    });
});