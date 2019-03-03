module.exports = function(api) {
  api.cache(true);

  const presets = [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current"
        }
      },
      "@babel/preset-react"
    ]
  ];
  const plugins = [
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    ["@babel/plugin-proposal-object-rest-spread", { loose: true }],
    "@babel/plugin-transform-object-assign",
    "@babel/plugin-transform-runtime"
  ];

  return {
    presets,
    plugins
  };
};
