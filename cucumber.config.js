module.exports = {
    default: {
        formatOptions: {
            snippetInterface: 'async-await',
        },
        paths: [
            // Define your Feature file path here
            'tests/features/UI/*.feature',
        ],
        dryRun: false,
        require: [
            // Define your Step definition path here
            'tests/steps/*.js',
            'tests/hooks/*.js',
        ],
        // format for progress-bar in terminal logs
        // parallel for parallel execution on multiple browser
        // tags for defining the Tags to use in feature file
        format: ['progress-bar'],
        parallel: 2,
        tags: process.env.TEST_TAGS || '@ui or @api or @gql',
    },
};