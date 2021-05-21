const stringList = `
✔ Linked to project @simpleview/reactapp
✔ Showing 5 matching builds for the project @simpleview/reactapp

ID               1a73893f-e667-451d-b186-047f509380c1
Platform         iOS
Status           finished
Distribution     simulator
Release Channel  unknown
Logs             https://expo.io/accounts/simpleview/builds/1a73893f-e667-451d-b186-047f509380c1
Artifact         https://turtle-v2-artifacts.s3.amazonaws.com/ios/d140da7c-bff1-45f7-a020-04eb676d1a19-7077dd324dcf4b44b5013c8a8a7c709b.tar.gz
Started at       5/21/2021, 2:56:01 PM
Finished at      5/21/2021, 3:21:34 PM
Started by       lance.tipton

———

ID               3431cc78-09f3-4634-ae4c-e0d45945130c
Platform         iOS
Status           finished
Distribution     simulator
Release Channel  unknown
Logs             https://expo.io/accounts/simpleview/builds/3431cc78-09f3-4634-ae4c-e0d45945130c
Artifact         https://turtle-v2-artifacts.s3.amazonaws.com/ios/68c58e20-510b-41f4-9a4e-7dc89c3432da-6202e1c9ff5045f79ef0a96c94f7df34.tar.gz
Started at       5/21/2021, 12:27:15 PM
Finished at      5/21/2021, 12:57:16 PM
Started by       lance.tipton

———

ID               a404a45f-acd9-4238-8b07-af5f96ea6fdc
Platform         iOS
Status           finished
Distribution     simulator
Release Channel  unknown
Logs             https://expo.io/accounts/simpleview/builds/a404a45f-acd9-4238-8b07-af5f96ea6fdc
Artifact         https://turtle-v2-artifacts.s3.amazonaws.com/ios/9857370d-8ce0-4a69-894a-f24ee7038def-207a29eedd6543b5aea819923d45e6b6.tar.gz
Started at       5/21/2021, 11:29:00 AM
Finished at      5/21/2021, 11:55:13 AM
Started by       lance.tipton

———

ID               28700b93-28e4-400f-b013-99e7bb0df3f5
Platform         iOS
Status           errored
Distribution     simulator
Release Channel  unknown
Logs             https://expo.io/accounts/simpleview/builds/28700b93-28e4-400f-b013-99e7bb0df3f5
Artifact         ---------
Started at       5/21/2021, 10:55:43 AM
Finished at      5/21/2021, 11:18:27 AM
Started by       lance.tipton

———

ID               8d2ab605-5ca5-414a-a0bb-0965eabbc041
Platform         iOS
Status           errored
Distribution     simulator
Release Channel  unknown
Logs             https://expo.io/accounts/simpleview/builds/8d2ab605-5ca5-414a-a0bb-0965eabbc041
Artifact         ---------
Started at       5/20/2021, 5:44:08 PM
Finished at      5/20/2021, 6:06:47 PM
Started by       lance.tipton
`

const jsonList = [
  {
    id: '1a73893f-e667-451d-b186-047f509380c1',
    platform: 'iOS',
    status: 'finished',
    distribution: 'simulator',
    releaseChannel: 'unknown',
    logs: 'https://expo.io/accounts/simpleview/builds/1a73893f-e667-451d-b186-047f509380c1',
    artifact: 'https://turtle-v2-artifacts.s3.amazonaws.com/ios/d140da7c-bff1-45f7-a020-04eb676d1a19-7077dd324dcf4b44b5013c8a8a7c709b.tar.gz',
    startedAt: '5/21/2021, 2:56:01 PM',
    finishedAt: '5/21/2021, 3:21:34 PM',
    startedBy: 'lance.tipton'
  },
  {
    id: '3431cc78-09f3-4634-ae4c-e0d45945130c',
    platform: 'iOS',
    status: 'finished',
    distribution: 'simulator',
    releaseChannel: 'unknown',
    logs: 'https://expo.io/accounts/simpleview/builds/3431cc78-09f3-4634-ae4c-e0d45945130c',
    artifact: 'https://turtle-v2-artifacts.s3.amazonaws.com/ios/68c58e20-510b-41f4-9a4e-7dc89c3432da-6202e1c9ff5045f79ef0a96c94f7df34.tar.gz',
    startedAt: '5/21/2021, 12:27:15 PM',
    finishedAt: '5/21/2021, 12:57:16 PM',
    startedBy: 'lance.tipton'
  },
  {
    id: 'a404a45f-acd9-4238-8b07-af5f96ea6fdc',
    platform: 'iOS',
    status: 'finished',
    distribution: 'simulator',
    releaseChannel: 'unknown',
    logs: 'https://expo.io/accounts/simpleview/builds/a404a45f-acd9-4238-8b07-af5f96ea6fdc',
    artifact: 'https://turtle-v2-artifacts.s3.amazonaws.com/ios/9857370d-8ce0-4a69-894a-f24ee7038def-207a29eedd6543b5aea819923d45e6b6.tar.gz',
    startedAt: '5/21/2021, 11:29:00 AM',
    finishedAt: '5/21/2021, 11:55:13 AM',
    startedBy: 'lance.tipton'
  },
  {
    id: '28700b93-28e4-400f-b013-99e7bb0df3f5',
    platform: 'iOS',
    status: 'errored',
    distribution: 'simulator',
    releaseChannel: 'unknown',
    logs: 'https://expo.io/accounts/simpleview/builds/28700b93-28e4-400f-b013-99e7bb0df3f5',
    artifact: '---------',
    startedAt: '5/21/2021, 10:55:43 AM',
    finishedAt: '5/21/2021, 11:18:27 AM',
    startedBy: 'lance.tipton'
  },
  {
    id: '8d2ab605-5ca5-414a-a0bb-0965eabbc041',
    platform: 'iOS',
    status: 'errored',
    distribution: 'simulator',
    releaseChannel: 'unknown',
    logs: 'https://expo.io/accounts/simpleview/builds/8d2ab605-5ca5-414a-a0bb-0965eabbc041',
    artifact: '---------',
    startedAt: '5/20/2021, 5:44:08 PM',
    finishedAt: '5/20/2021, 6:06:47 PM',
    startedBy: 'lance.tipton'
  }
]

module.exports = {
  stringList,
  jsonList
}