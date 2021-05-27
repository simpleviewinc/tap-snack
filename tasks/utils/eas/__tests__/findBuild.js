const { findBuild } = require('../findBuild')

const mockBuilds = [
  {
    id: '789',
    platform: 'ios',
    status: 'finished',
    distribution: 'wow',
    releaseChannel: 'unknown',
    logs: 'https://expo.io/accounts/simpleview/builds/9f2104f5-0a68-4f57-9079-0a3f56ac0601',
    artifact: 'treasure',
    startedAt: '5/25/2021, 5:53:05 PM',
    finishedAt: '5/25/2021, 7:00:13 PM',
    startedBy: 'charlie.kelly'
  },
  {
    id: '123',
    platform: 'ios',
    status: 'finished',
    distribution: 'something',
    releaseChannel: 'unknown',
    logs: 'https://expo.io/accounts/simpleview/builds/9f2104f5-0a68-4f57-9079-0a3f56ac0601',
    artifact: 'https://turtle-v2-artifacts.s3.amazonaws.com/android/a57d4eec-a7a3-4a61-b7ex-48e171e0dc17-9b55b85901d841228baa34e2f2071e17.apk',
    startedAt: '5/25/2021, 5:53:05 PM',
    finishedAt: '5/25/2021, 7:00:13 PM',
    startedBy: 'charlie.kelly'
  },
  {
    id: '456',
    platform: 'ios',
    status: 'finished',
    distribution: 'test',
    releaseChannel: 'boom',
    logs: 'https://expo.io/accounts/simpleview/builds/9f2104f5-0a68-4f57-9079-0a3f56ac0601',
    artifact: 'https://turtle-v2-artifacts.s3.amazonaws.com/android/a57d4eec-a7a3-4a61-b7ex-48e171e0dc17-9b55b85901d841228baa34e2f2071e17.apk',
    startedAt: '5/25/2021, 6:54:05 PM',
    finishedAt: '5/25/2021, 7:00:13 PM',
    startedBy: 'charlie.kelly'
  },
  {
    id: '9f2104f5-0a68-4f57-9079-0a3f56ac0601',
    platform: 'Android',
    status: 'finished',
    distribution: 'internal',
    releaseChannel: 'unknown',
    logs: 'https://expo.io/accounts/simpleview/builds/9f2104f5-0a68-4f57-9079-0a3f56ac0601',
    artifact: 'https://turtle-v2-artifacts.s3.amazonaws.com/android/a57d4eec-a7a3-4a61-b7ex-48e171e0dc17-9b55b85901d841228baa34e2f2071e17.apk',
    startedAt: '5/25/2021, 6:54:05 PM',
    finishedAt: '5/25/2021, 7:00:13 PM',
    startedBy: 'lance.tipton'
  },
  {
    id: '987',
    platform: 'IoS',
    status: 'finished',
    distribution: 'internal',
    releaseChannel: 'unknown',
    logs: 'the absolute latest build',
    artifact: 'https://turtle-v2-artifacts.s3.amazonaws.com/android/27bda879-c7a2-4cd3-9b08-a830a3823483-177732beff7b499d8b64cf15dxe95ca0.apk',
    startedAt: '5/25/2021, 7:53:04 PM',
    finishedAt: '5/25/2021, 9:06:09 PM',
    startedBy: 'charlie.kelly'
  },
  {
    id: '03fe4f82-08e6-4b07-bedf-b5e29e0a0cee',
    platform: 'IOS',
    status: 'finished',
    distribution: 'internal',
    releaseChannel: 'unknown',
    logs: 'https://expo.io/accounts/simpleview/builds/03fe4f82-08e6-4b07-bedf-b5e29e0a0cee',
    artifact: 'https://turtle-v2-artifacts.s3.amazonaws.com/android/27bda879-c7a2-4cd3-9b08-a830a3823483-177732beff7b499d8b64cf15dxe95ca0.apk',
    startedAt: '5/25/2021, 6:00:03 PM',
    finishedAt: '5/25/2021, 6:06:08 PM',
    startedBy: 'charlie.kelly'
  },
  {
    id: '93fe4f82-88e6-xb07-xedf-b5e29e0a0cex',
    platform: 'IoS',
    status: 'errored',
    distribution: 'internal',
    releaseChannel: 'unknown',
    logs: 'https://expo.io/accounts/simpleview/builds/03fe4f82-08e6-4b07-bedf-b5e29e0a0cee',
    artifact: 'https://turtle-v2-artifacts.s3.amazonaws.com/android/27bda879-c7a2-4cd3-9b08-a830a3823483-177732beff7b499d8b64cf15dxe95ca0.apk',
    startedAt: '5/25/2021, 6:00:04 PM',
    finishedAt: '5/25/2021, 6:06:09 PM',
    startedBy: 'charlie.kelly'
  },
  {
    id: '33fe4f82-88e6-cb07-bedf-b5e29e0a0cex',
    platform: 'IoS',
    status: 'errored',
    distribution: 'internal',
    releaseChannel: 'unknown',
    logs: 'https://expo.io/accounts/simpleview/builds/03fe4f82-08e6-4b07-bedf-b5e29e0a0cee',
    artifact: 'https://turtle-v2-artifacts.s3.amazonaws.com/android/27bda879-c7a2-4cd3-9b08-a830a3823483-177732beff7b499d8b64cf15dxe95ca0.apk',
    startedAt: '5/25/2021, 5:49:04 PM',
    finishedAt: '5/25/2021, 6:04:09 PM',
    startedBy: 'charlie.kelly'
  },
  {
    id: '00b597f6-58b9-4f04-8b2d-6b77b7e03727',
    platform: 'Android',
    status: 'errored',
    distribution: 'internal',
    releaseChannel: 'unknown',
    logs: 'https://expo.io/accounts/simpleview/builds/00b597f6-58b9-4f04-8b2d-6b78b7e03727',
    artifact: '---------',
    startedAt: '5/25/2021, 5:38:42 PM',
    finishedAt: '5/25/2021, 5:44:29 PM',
    startedBy: 'charlie.kelly'
  },
]

describe('findBuild', () => {
  const params = {
    platform: 'ios',
    startedBy: 'charlie.kelly',
  }
  it('should find the latest build matching the parameters', () => {
    const build = findBuild(mockBuilds, params)
    expect(build.id).toEqual('987')
  })

  it('should check status', () => {
    const erroredBuild = findBuild(mockBuilds, { ...params, status: 'errored' })
    expect(erroredBuild.id).toEqual(
      '93fe4f82-88e6-xb07-xedf-b5e29e0a0cex'   
    )
  })

  it('should check distribution', () => {
    const build = findBuild(mockBuilds, { ...params, distribution: 'something' })
    expect(build.id).toEqual('123')
  })

  it('should check releaseChannel', () => {
    const build = findBuild(mockBuilds, { ...params, releaseChannel: 'boom' })
    expect(build.id).toEqual('456')
  })

  it('should check artifact', () => {
    const build = findBuild(mockBuilds, { ...params, artifact: 'treasure' })
    expect(build.id).toEqual('789')
  })

  it('should return null for no match', () => {
    const build = findBuild(mockBuilds, {
      platform: 'ios',
      startedBy: 'frank.reynolds',
    })
    expect(build).toEqual(null)
  })
})