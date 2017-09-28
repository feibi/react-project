### 此项目基于:

- react
- redux
- react-router4
- webpack3
- react-saga

#### 开发环境

1. 首先生成公共包，避免重复打包，提升webpack打包速度。此包未经过压缩，会有 sourcemap 文件生成

``` 
npm run dll:dev
```

2. 执行开发命令，上面生成的文件不会再打包处理，只是单纯的引用

```
npm start
```

#### 生产环境

1. 生成公共包，代码经过压缩

```
npm run dll
```

2. 执行打包命令，生成最终压缩过的文件

```
npm run build
```

> 如果公共包未变化，则hash值不会变化，下次可跳过此步骤


> 开发或上线前，一定要先产生dll文件，后续操作都基于此包。



