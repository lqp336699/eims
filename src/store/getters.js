const getters = {
  sidebar: state => state.app.sidebar, // 侧边栏

  size: state => state.app.size, // 尺寸

  device: state => state.app.device, // 设备版本？产品期/设计期

  visitedViews: state => state.tagsView.visitedViews, // 访问视图？
  // 缓存视图
  cachedViews: state => state.tagsView.cachedViews,

  // userId: state => state.user.userId,
  // sessionId: state => state.user.sessionId,
  // 令牌
  token: state => state.user.token,
  // 头像
  avatar: state => state.user.avatar,
  // 用户名
  name: state => state.user.name,
  //
  introduction: state => state.user.introduction,
  // 角色
  roles: state => state.user.roles,
  // 授权路由
  permission_routes: state => state.permission.routes,
  // 错误日志
  errorLogs: state => state.errorLog.logs,
  kinds: state => state.techCenter.kinds,
  proc_kinds: state => state.techCenter.proc_kinds,
  searchData: state => state.techCenter.searchData
}
export default getters
