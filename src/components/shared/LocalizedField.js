import React from "react";

const LocalizedFiled = ({name}) => {
    return (
        <>
            <InputField
                label={<Trans id={`${name}_ar`} />}
                name={`${name}.ar`}
                placeholder={i18n._(`${name}`)}
            />
            <InputField
                label={<Trans id={`${name}_en`} />}
                name={`${name}.en`}
                placeholder={i18n._(`${name}`)}
            />
        </>
    )
}
export default LocalizedFiled;