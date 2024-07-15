interface VarintProps {
    prefix: string;
    variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'
}

const getVariant = (prefix, variant, classes) => {
    let vystup = ''
    if (variant) {
        let classArray: string[] = [];
        classes && classArray.push(classes);
        classArray.push(prefix + '-' + variant);
        vystup = classArray.join(' ');
    }

    return (vystup);
};

export default getVariant;