import {
  FuseBox,
  CSSPlugin,
  QuantumPlugin,
  SassPlugin,
  WebIndexPlugin,
} from 'fuse-box'
import {
  src,
  task,
} from 'fuse-box/sparky'


const frontendServe = () => {
  const fuse = FuseBox.init({
    homeDir: '.',
    output: 'dist/$name',
    target: 'browser@esnext',
    plugins: [
      WebIndexPlugin({
        template: 'src/index.html'
      }),
    ],
  })
  fuse.dev({ hmr: true, port: 3001 })
  const bundle = fuse.bundle('dist/bundle').watch('src/*.(ts|tsx)').hmr()
  bundle.instructions('> src/index.tsx')
  return fuse.run()
}

task('clean_all', () => src('build').clean('build').exec())
task('fe_serve', frontendServe)

task('default', ['clean_all', 'fe_serve'])
