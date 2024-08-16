import React from 'react';

interface ButtonProps {
    isSaving: boolean;
    onClick?: any;
}

const SaveButton: React.FC<ButtonProps> = ({ isSaving, onClick }) => {
    return (
        <button className="btn btn-primary mr-4" type="button" disabled={isSaving} onClick={onClick}>
            {isSaving && (<span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>)}
            {isSaving ? 'Saving...' : 'Save'}
        </button>
    );
};

const CreateButton: React.FC<ButtonProps> = ({ isSaving }) => {
    return (
        <button className="btn btn-primary mr-4" type="submit" disabled={isSaving}>
            {isSaving && (<span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>)}
            {isSaving ? 'Creating...' : 'Create'}
        </button>
    );
};

const AddButton: React.FC<ButtonProps> = ({ isSaving, onClick }) => {
    return (
        <button className="btn btn-primary mr-4" type="button" disabled={isSaving} onClick={onClick}>
            {isSaving && (<span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>)}
            {isSaving ? 'Adding...' : 'Add'}
        </button>
    );
};


export { SaveButton, CreateButton, AddButton };