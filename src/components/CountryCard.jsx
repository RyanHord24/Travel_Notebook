import React from 'react';
import Card from 'react-bootstrap/Card';

const CountryCard = ({ photoUrl, name, vicinity }) => {
    return (
        <Card style={{ width: '18rem', marginBottom: '1rem' }}>
            {photoUrl ? (
                <Card.Img variant="top" src={photoUrl} alt={name} />
            ) : (
                <Card.Img
                    variant="top"
                    src="https://via.placeholder.com/150"
                    alt="Placeholder"
                />
            )}
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{vicinity}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default CountryCard;
