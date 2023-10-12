const smartgrid = require('smart-grid');

const settings = {
    columns: 12,
    offset: '20px',
    container: {
        maxWidth: '1200px',
        fields: '30px'
    },
    breakPoints: {
        lg: {
            width: "1240px"
        },
        md: {
            width: "1024px",
        },
        mmd: {
            width: "860px",
        },
        sm: {
            width: "768px",
            fields: "20px"
        },
        xs: {
            width: "590px",
        },
        xxs: {
            width: "374px",
            fields: "10px"
        }
    },
    oldSizeStyle: false,
    mobileFirst: false
};

smartgrid('./src/less/libs', settings);