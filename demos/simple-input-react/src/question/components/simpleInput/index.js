import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

export default function SimpleInput(props) {
    const {
        state,
        maxLength,
        disabled,
        responseValues, // Updated: Receive an array
        validationUIState,
        requestToResetValidationUIState,
        focusingIndex,
        onChange,
        resetState,
        onInputFocus
    } = props;

    const isReviewState = state === 'review';
    const [inputValues, setInputValues] = useState(responseValues); // Initialize with empty array

    useEffect(() => {
        if (resetState === 'reset') {
            setInputValues([]);
        } else {
            setInputValues(responseValues); 
        }
    }, [resetState, responseValues]);

    const onInputChange = (index, e) => {
        if (!isReviewState) {
            const newValue = e.currentTarget.value;
            setInputValues(currentValues => { 
                const newValues = [...currentValues];
                newValues[index] = newValue; 
                console.log('>> newValues', newValues);
                onChange(newValues);
                return newValues;
            });
        }
    };

    return (
        <div className="lrn_widget lrn_shorttext">
            <div className="lrn_response_wrapper">
                <div className="lrn_response lrn_clearfix">
                    <div className={classnames({
                        lrn_correct: validationUIState === 'correct',
                        lrn_incorrect: validationUIState === 'incorrect'
                    }, 'lrn_textinput')}>
                    {inputValues.map((inputValue, index) => (
                        <div>
                            <input
                                type="text"
                                key="123123o3j123o12ij312ioj3"
                                value={inputValue}
                                maxLength={maxLength}
                                onChange={(e) => onInputChange(index, e)}
                                onFocus={() => onInputFocus(index)}
                                disabled={isReviewState || disabled}
                                style={{borderColor: focusingIndex === index ? 'blue' : 'black',
                                    borderWidth: focusingIndex === index ? '2px' : '1px'}}
                            />
                            <div>
                                <br></br>
                            </div>
                        </div>
                    ))}
                    </div> 
                </div>
            </div>
        </div>
    );
}
