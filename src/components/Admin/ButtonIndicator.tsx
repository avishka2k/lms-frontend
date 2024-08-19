import React from 'react';

interface ButtonProps {
    isSaving: boolean;
    onClick?: any;
    type: 'button' | 'submit';
    label: string;
    activeLabel: string;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ isSaving, onClick, type, label, activeLabel, disabled }) => {
    return (
        <button className="btn btn-primary mr-4" type={type} disabled={isSaving || disabled} onClick={onClick}>
            {isSaving && (<span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>)}
            {isSaving ? `${activeLabel}` : label}
        </button>
    );
};

const SaveButton: React.FC<Omit<ButtonProps, 'type' | 'label'| 'activeLabel'>> = (props) => (
    <Button {...props} type="button" activeLabel="Saving..." label="Save" />
);

const CreateButton: React.FC<Omit<ButtonProps, 'type' | 'label'| 'activeLabel'>> = (props) => (
    <Button {...props} type="submit" activeLabel='Creating...' label="Create" />
);

const AddButton: React.FC<Omit<ButtonProps, 'type' | 'label'| 'activeLabel'>> = (props) => (
    <Button {...props} type="button" activeLabel='Adding...' label="Add" />
);

const AssignButton: React.FC<Omit<ButtonProps, 'type' | 'label'| 'activeLabel'>> = (props) => (
    <Button {...props} type="button" activeLabel='Assigning...' label="Assign" />
);

export { SaveButton, CreateButton, AddButton, AssignButton };