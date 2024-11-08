import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'chartscii-plugin.js',
    output: {
        file: 'dist/bundle.js',
        format: 'iife',
        name: 'ChartsciiBundle'
    },
    plugins: [
        resolve(),
        commonjs() // CommonJS-Plugin hinzufügen
    ]
};
