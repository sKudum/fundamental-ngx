module.exports = {
    name: 'play',
    preset: '../../jest.config.js',
    coverageDirectory: '../../coverage/apps/play',
    snapshotSerializers: [
        'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
        'jest-preset-angular/build/AngularSnapshotSerializer.js',
        'jest-preset-angular/build/HTMLCommentSerializer.js'
    ]
};
